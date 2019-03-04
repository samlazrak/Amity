import React from 'react';
import styled from 'styled-components';
import Input from '../../Core/Input';
import { Button } from '../../Core/Buttons';
import Validator from '../../../../shared/validator';
import handleChange from '../../../utils/HandleChange';
import validatorPresets from '../../../../shared/validator-presets';
import { clearAuthToken } from '../../../utils/Authentication';

const ResetFormWrapper = styled.form`
  padding: 30px;

  button {
    margin-top: 8px;
  }
`;

interface Props {
  onSubmit: Function;
};

interface State {
  password: string;
  verifyPassword: string;
  errors: {
    password?: string;
    verifyPassword?: string;
  };
};

class ResetForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
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

    validator.verify('password')
      .isRequired('New password is required.')

    validator.verify('verifyPassword')
      .isRequired('Verify password is required.')
      .matches(this.state.password, 'Must match new password.');

    const { success, data, errors } = validator.validate();

    delete data.verifyPassword;

    if (!success) return this.setState({ errors });

    this.props.onSubmit(data.password);
  }

  render() {
    return (
      <ResetFormWrapper>
        <Input
          name="password"
          type="password"
          placeholder="New Password"
          errors={this.state.errors}
          onChange={this.handleChange}
        />
        <Input
          name="verifyPassword"
          type="password"
          placeholder="Verify New Password"
          errors={this.state.errors}
          onChange={this.handleChange}
        />
        <Button onClick={this.submit}>Reset Password</Button>
      </ResetFormWrapper>
    );
  }
}

export default ResetForm;
