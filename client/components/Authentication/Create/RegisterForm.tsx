import React from 'react';
import styled from 'styled-components';
import Input from '../../Core/Input';
import { Button } from '../../Core/Buttons';
import Validator from '../../../../shared/validator';
import handleChange from '../../../utils/HandleChange';
import validatorPresets from '../../../../shared/validator-presets';
import { clearAuthToken } from '../../../utils/Authentication';
import { setLoginPlaceholderEmail } from '../../../utils/Authentication';

const RegisterFormWrapper = styled.form`
  padding: 30px;

  button {
    margin-top: 8px;
  }
`;

interface State {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  errors: {
    name?: string;
    email?: string;
    password?: string;
    verifyPassword?: string;
  };
};

interface Props {
  data: {
    id: string;
    email: string;
  };
  onSubmit: Function;
};

class RegisterForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      email: props.data.email,
      password: '',
      verifyPassword: '',
      errors: {},
    };
  }

  componentDidMount() {
    clearAuthToken();
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    handleChange(this, e);
  }

  submit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const validator = new Validator(this.state);
    validatorPresets.check('UserAPI.create', validator);

    validator.verify('verifyPassword')
      .isRequired('Verify password is required.')
      .matches(this.state.password, 'Must match password.');

    const { success, data, errors } = validator.validate();

    delete data.verifyPassword;

    if (!success) return this.setState({ errors });

    setLoginPlaceholderEmail(data.email);
    this.props.onSubmit(data);
  }

  render() {
    return (
      <RegisterFormWrapper>
        <Input
          name="name"
          type="text"
          placeholder="Full Name"
          errors={this.state.errors}
          onChange={this.handleChange}
        />
        <Input
          name="username"
          type="text"
          placeholder="Email Address"
          value={this.props.data.email}
          errors={this.state.errors}
          onChange={this.handleChange}
          disabled
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          errors={this.state.errors}
          onChange={this.handleChange}
        />
        <Input
          name="verifyPassword"
          type="password"
          placeholder="Verify Password"
          errors={this.state.errors}
          onChange={this.handleChange}
        />
        <Button onClick={this.submit}>Sign Up</Button>
      </RegisterFormWrapper>
    );
  }
}

export default RegisterForm;
