import UserAPI from '../../api/user';
import ComanyAPI from '../../api/company';
import wrap from '../utils/wrap';
import { restrictToUser, restrictTo, restrictToSuper } from '../../authentication/middleware';
import { User } from '../../../shared/types/authentication';

export default {
  Query: {
    user: wrap(restrictTo('admin'), UserAPI.getOne),
    users: wrap(restrictTo('admin'), UserAPI.getAll),
    me: wrap(restrictToUser, UserAPI.getCurrentUser),
    verifyPasswordReset: wrap(UserAPI.verifyPasswordResetToken),
  },
  Mutation: {
    authenticate: wrap(UserAPI.authenticate),
    createUser: wrap(UserAPI.create),
    updateUser: wrap(restrictTo('admin'), UserAPI.update),
    deleteUser: wrap(restrictToSuper, UserAPI.delete),
    inviteUser: wrap(restrictTo('admin'), UserAPI.sendUserInvite),
    requestPasswordReset: wrap(UserAPI.requestPasswordReset),
    resetPassword: wrap(UserAPI.resetPassword),
  },
  User: {
    bambooProfile: (user: User) => ComanyAPI.getBambooProfile({ email: user.email }),
  }
};
