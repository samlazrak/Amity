import Base from './base';

export interface Authentication {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export interface AuthenticationArgs {
  userId: string;
};

// @ts-ignore
const AuthenticationModel = Base.extend({
  tableName: 'authentication',
});

export default AuthenticationModel;
