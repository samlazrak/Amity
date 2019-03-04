import ms from 'ms';
import Tokens from '../authentication/tokens';
import UserModel from '../models/user';
import UserInviteModel from '../models/user-invite';
import PasswordResetModel from '../models/password-reset';
import AuthenticationModel from './../models/authentication';
import Validator from '../../shared/validator';
import validatorPresets from '../../shared/validator-presets';
import mailer from '../mail/mailer';
import {
  getInviteUserEmail,
  getResetPasswordEmail
} from './../mail/templates';
import {
  Context,
  User,
  UserArgs,
  AuthInput,
  AuthResponse,
  PasswordReset,
  OktaProfile
} from '../../shared/types/authentication';

class UserAPI {
  /**
   * Fetches a single user
   * @param args query fields used to fetch user
   */
  public static async fetchOne(args: UserArgs): Promise<any> {
    return UserModel.where(args).fetch();
  }

  /**
   * Fetches a single user and returns the the user as a  JSON object
   * @param {UserArgs} args query fields used to fetch user
   */
  public static async getOne(args: UserArgs): Promise<User> {
    return (await UserAPI.fetchOne(args)).toJSON();
  }

  /**
   * Fetches a list of all users and returns them as a JSON list
   */
  public static async getAll(): Promise<User[]> {
    return (await UserModel.where({}).fetchAll()).toJSON();
  }

  /**
   * Fetches the currently signed in user
   * @param {any} args
   * @param {Object} context
   */
  public static async getCurrentUser(args: any, context: Context): Promise<User> {
    return UserAPI.getOne({ id: context.user.get('id') });
  }

  /**
   * Finds or creates a user after successful Okta authentication
   * @param args
   */
  public static async getOrCreateOktaUser(args: OktaProfile): Promise<User> {
    let user = await UserAPI.fetchOne({ email: args.email });

    if (!user) {
      // user doesn't exist, create a new one
      const name = `${args.firstName} ${args.lastName}`;
      const userRoles = { permissions: [] };
      user = new UserModel({ name, email: args.email, userRoles });
    }

    // all Okta users should have admin privileges
    UserAPI.addAdminRoleToUser({ user });
    await user.save();

    return user.toJSON();
  }

  /**
   * Makes a user an admin
   * @param args
   */
  private static addAdminRoleToUser(args: { user: any }) {
    const userRoles = args.user.get('userRoles');

    if (!userRoles.permissions.includes('admin')) {
      userRoles.permissions.push('admin');
    }

    args.user.set({ userRoles: JSON.stringify(userRoles) });
  }

  /**
   * Verifies that a user invite token is valid
   * @param {Object} args the password reset token
   */
  public static async verifyInviteToken(args: { token: string }) {
    const tokenData = await Tokens.verifyToken(args.token);

    if (tokenData.type !== 'invite') {
      throw new Error('Invalid user invite token.');
    }

    return tokenData;
  }

  /**
   * Creates a new user
   * @param {Object} args fields to create the new user
   */
  public static async create(args: { token: string, input: UserArgs }): Promise<User> {
    const tokenData = await UserAPI.verifyInviteToken({ token: args.token });
    const validator = new Validator(args.input);
    validatorPresets.check('UserAPI.create', validator);

    const { success, data, errorMessage } = validator.validate();

    if (success) {
      process.nextTick(() => UserAPI.markInviteAsAccepted(tokenData.id));
      data.email = data.email.toLowerCase();
      const user = new UserModel(data);
      return (await user.save()).toJSON();
    }

    throw new Error(errorMessage);
  }

  /**
   * Changes a user invite status to accepted
   * @param {string} id
   */
  private static async markInviteAsAccepted(id: string): Promise<void> {
    const invite = await UserInviteModel.where({ id }).fetch();

    if (!invite) {
      throw new Error('Attempted to mark non-existent invite as accepted.');
    }

    invite.set({ userRegistered: true }).save();
  }

  /**
   * Updates a user
   * @param {Object} args fields to update on the user
   */
  public static async update(args: { id: string, input: UserArgs }, context: Context): Promise<User> {
    const user = await UserModel.where({ id: args.id }).fetch();
    const editingSelf = user.get('id') === context.user.get('id');

    const validator = new Validator(args.input);
    validatorPresets.check('userAPI.update', validator);
    const { success, data, errorMessage } = validator.validate();

    if (!user) throw new Error('Unable to find user to update.');
    if (!success) throw new Error(errorMessage);

    if (user.isAdmin() && !editingSelf && !context.user.isSuper()) {
      // admins can not update other admins
      throw new Error('Invalid permissions.');
    }

    // roles/permissions need to be updated in updateUserPermissions
    if (args.input.userRoles) {
      const { permissions } = args.input.userRoles;
      await UserAPI.updateUserPermissions(user, { permissions }, context);
    }

    user.set(data);
    return (await user.save()).toJSON();
  }

  /**
   * Updates a users permissions
   * @param {Object} args
   * @param {Context} context
   */
  public static async updateUserPermissions(
    user: any,
    args: { permissions: string[] },
    context: Context
  ): Promise<void> {

    const addingAdminOrSuper =
      args.permissions.includes('super') ||
      args.permissions.includes('admin');

    // non-super users cannot make users super
    if (addingAdminOrSuper && !context.user.isSuper()) {
      throw new Error('Invalid permissions.');
    }

    user.set({ userRoles: JSON.stringify({ permissions: args.permissions }) });
  }

  /**
   * Updates the currently signed-in user
   * @param {Object} args fields to update on the user
   * @param {Context} context
   */
  public static async updateCurrentUser(args: { input: UserArgs }, context: Context): Promise<User> {
    const updatedArgs = Object.assign({}, args, { id: context.user.id });
    return UserAPI.update(updatedArgs, context);
  }

    /**
   * Deletes a user
   * @param {Object} args id of user to delete
   */
  public static async delete(args: { id: string }, context: Context): Promise<boolean> {
    const user = await UserModel.where({ id: args.id }).fetch();

    if (!user) throw new Error ('Unable to find a user with that ID.');
    await user.destroy({ cascadeDelete: true });
    return true;
  }

  /**
   * Generates an auth response with an auth token and the user object
   * @param {User} user the authenticated user
   */
  public static generateAuthResponse(user: User): AuthResponse {
    const tokenData = Object.assign({}, user);
    delete tokenData.spassword;

    process.nextTick(() => {
      new AuthenticationModel({ userId: user.id }).save();
    });

    return {
      user,
      token: Tokens.generateToken(tokenData),
    };
  }

  /**
   * Authenticates a user and returns an AuthResponse
   * @param {Object} args email and password to authenticate with
   */
  public static async authenticate(args: { input: AuthInput }): Promise<AuthResponse> {
    const email = args.input.email.toLowerCase();
    const user = await UserModel.where({ email }).fetch();
    const errorMessage = 'Invalid email address or password.';

    if (!user) throw new Error(errorMessage);

    try {
      await user.authenticate(args.input.password);
    } catch (e) {
      throw new Error(errorMessage);
    }

    return UserAPI.generateAuthResponse(user.toJSON());
  }

  /**
   * Sends an invite for a new user to join
   * @param args the email of the user to invite
   */
  public static async sendUserInvite(args: { name: string, email: string }, context: Context): Promise<boolean> {
    const existingUser = await UserAPI.fetchOne({ email: args.email });

    if (existingUser) {
      throw new Error('There is already a user with that email address.');
    }

    const invite = await (new UserInviteModel({
      name: args.name,
      email: args.email,
      invitedBy: context.user.get('id'),
    }).save());

    // create a token used to validate the invite later
    const inviteToken = UserAPI.generateInviteToken({ invite });

    mailer.sendEmail(getInviteUserEmail(args.name, args.email, inviteToken));
    return true;
  }

  /**
   * Generates a token used to verify invite emails
   * @param args
   * @param context
   */
  private static generateInviteToken(args: { invite: any }) {
    const inviteToken = Tokens.generateToken({
      id: args.invite.get('id'),
      type: 'invite',
      email: args.invite.get('email'),
      exp: Date.now() + ms('7d'),
    });

    return inviteToken;
  }

  /**
   * Sends a password reset email
   * @param {Object} args the email of the user to send the password reset to
   */
  public static async requestPasswordReset(args: { email: string }): Promise<boolean> {
    const user = await UserAPI.fetchOne({ email: args.email });

    // send success regardless of whether or not there is a user with the provided email
    if (!user) return true;

    const passwordReset = await (new PasswordResetModel({
      userId: user.get('id'),
      emailRecipient: args.email
    }).save());

    // create a token used to validate the password reset later on
    const resetToken = UserAPI.generatePasswordResetToken({ passwordReset });
    mailer.sendEmail(getResetPasswordEmail(args.email, resetToken));
    return true;
  }

  /**
   * Generates a token used to verify password reset requests
   * @param args
   */
  private static generatePasswordResetToken(args: { passwordReset: any }) {
    const resetToken = Tokens.generateToken({
      id: args.passwordReset.get('id'),
      type: 'reset',
      email: args.passwordReset.get('emailRecipient'),
    });

    return resetToken;
  }

  /**
   * Verifies that a password reset token is valid
   * @param {Object} args the password reset token
   */
  public static async verifyPasswordResetToken(args: { token: string }): Promise<PasswordReset> {
    const tokenData = await Tokens.verifyToken(args.token);
    const passwordReset = await PasswordResetModel.where({ id: tokenData.id }).fetch();

    if (tokenData.type !== 'reset' || !passwordReset || passwordReset.get('used')) {
      throw new Error('Invalid password reset token.');
    }

    return passwordReset.toJSON();
  }

  /**
   * Marks a password reset as used
   * @param {string} id the id of the password reset model
   */
  private static async markPasswordResetAsUsed(id: string): Promise<void> {
    const passwordReset = await PasswordResetModel.where({ id }).fetch();

    if (!passwordReset) {
      throw new Error('Attempted to mark non-existent password reset as used.');
    };

    passwordReset.set({ used: true }).save();
  }

  /**
   * Resets a user's current password
   * @param {Object} args the password reset token and new password
   */
  public static async resetPassword(args: { token: string, password: string }): Promise<boolean> {
    const passwordReset = await UserAPI.verifyPasswordResetToken({ token: args.token });
    const user = await UserAPI.fetchOne({ id: passwordReset.userId });

    if (!user) {
      throw new Error('No user with that email address.');
    }

    await (user.set({ password: args.password }).save());

    process.nextTick(() => {
      UserAPI.markPasswordResetAsUsed(passwordReset.id);
    });

    return true;
  }
}

export default UserAPI;
