import React from 'react';
import styled from 'styled-components';
import Input from '../../Core/Input';
import { Button } from '../../Core/Buttons';
import Validator from '../../../../shared/validator';
import handleChange from '../../../utils/HandleChange';
import { getLoginPlaceholderEmail } from '../../../utils/Authentication';

const LoginFormWrapper = styled.form`
  padding: 30px 30px 0;
`;

interface Props {
  onSubmit: Function;
};

interface State {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
};

class LoginForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: getLoginPlaceholderEmail() || '',
      password: '',
      errors: {},
    };
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    handleChange(this, e);
  }

  submit = (e: any) => {
    e.preventDefault();
    const validator = new Validator(this.state);

    validator.verify('email')
      .isRequired('Email address is required.')
      .check('isEmail', 'Must be a valid email.');

    validator.verify('password')
      .isRequired('Password is required.');

    const { success, data, errors } = validator.validate();

    if (!success) return this.setState({ errors });
    this.props.onSubmit({ variables: data });
  }

  render() {
    return (
      <LoginFormWrapper>
        <Input
          name="email"
          type="text"
          value={this.state.email}
          placeholder="Email Address"
          onChange={this.handleChange}
          errors={this.state.errors}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
          errors={this.state.errors}
        />
        <Button onClick={this.submit}>Sign In</Button>
      </LoginFormWrapper>
    );
  }
}

export default LoginForm;
