import Validator from './validator';

const config = {
  'UserAPI.create': (validator: Validator): void => {
    validator.verify('name')
      .isRequired('Name is required.');

    validator.verify('email')
      .isRequired('Email is required.')
      .check('isEmail', 'Must be a valid email address.')

    validator.verify('password')
      .isRequired('Password is required.');
  },
  'UserAPI.update': (validator: Validator): void => {
    validator.verify('name');
    validator.verify('email');
  }
};

const validatorPresets = {
  check(key: string, validator: Validator): void {
    // @ts-ignore
    if (!config[key]) throw new Error(`No validator preset for ${key}`);
    // @ts-ignore
    return config[key](validator);
  }
}

export default validatorPresets;
