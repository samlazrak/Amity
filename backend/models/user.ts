import Base from './base';

// @ts-ignore
const UserModel = Base.extend({
  uuid: true,
  tableName: 'person',
  hasSecurePassword: 'spassword',
  isSuper() {
    return this.get('userRoles').permissions.includes('super');
  },
  isAdmin() {
    return this.isSuper() || this.get('userRoles').permissions.includes('admin');
  },
});

export default UserModel;
