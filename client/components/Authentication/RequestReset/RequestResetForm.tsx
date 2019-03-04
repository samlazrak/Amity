import React from 'react';
import styled from 'styled-components';
import Input from '../../Core/Input';
import { Button } from '../../Core/Buttons';
import Validator from '../../../../shared/validator';
import handleChange from '../../../utils/HandleChange';

const RequestResetFormWrapper = styled.form`
  padding: 30px;
`;

interface Props {
  onSubmit: Function;
};

interface State {
  email: string;
  errors: {
    email?: string;
  };
};

class RequestResetForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
    };
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    handleChange(this, e);
  }

  submit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const validator = new Validator(this.state);

    validator.verify('email')
      .isRequired('Email address is required.')
      .check('isEmail', 'Must be a valid email address.');

    const { success, data, errors } = validator.validate();

    if (!success) return this.setState({ errors });

    this.props.onSubmit({ variables: { email: data.email }});
  }

  render() {
    return (
      <RequestResetFormWrapper>
        <Input
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={this.handleChange}
          errors={this.state.errors}
        />
        <Button onClick={this.submit}>Reset Password</Button>
      </RequestResetFormWrapper>
    );
  }
}

export default RequestResetForm;
