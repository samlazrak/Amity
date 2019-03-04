export interface Context {
  user: any
};

export interface User {
  id: string;
  name: string;
  email: string;
  spassword: string;
};

export interface UserArgs {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  userRoles?: {
    permissions: string[];
  };
};

export interface OktaProfile {
  firstName: string;
  lastName: string;
  email: string;
};

export interface AuthInput {
  email: string;
  password: string;
};

export interface AuthResponse {
  token: string;
  user: User;
};

export interface PasswordReset {
  id: string;
  email: string;
  userId: string;
};

export interface BambooProfile {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  preferredName: string;
  gender: string;
  jobTitle: string;
  workPhone: string;
  mobilePhone: string;
  workEmail: string;
  department: string;
  location: string;
  photoUploaded: boolean;
  photoUrl: string;
}
