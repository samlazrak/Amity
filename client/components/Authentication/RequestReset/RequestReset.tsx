import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import AuthWrapper from '../AuthWrapper';
import RequestResetForm from './RequestResetForm';
import SuccessRedirect from '../Login/SuccessRedirect';
import Error from '../../Core/Error';
import { changePageTitle } from '../../../utils/Page';
import StatusMessage from '../StatusMessage';

const RequestResetMutation = gql`
  mutation RequestResetMutation($email: String!) {
    requestPasswordReset(email: $email)
  }
`;


const RequestReset = () => (
  <Mutation mutation={RequestResetMutation}>
    {(requestReset, { data, error }) => {
      changePageTitle('Forgot Password');
      if (data) return (
        <AuthWrapper>
          <StatusMessage
            message="An email has been sent to you with instructions on how to reset your password."
            link="/login"
            linkText="Return To Sign In Page"
          />
        </AuthWrapper>
      );

      return (
        <AuthWrapper>
          <Error error={error} />
          <RequestResetForm onSubmit={requestReset} />
          <Link className="auth-link" to="/login">Remember your password?</Link>
        </AuthWrapper>
      );
    }}
  </Mutation>
);

export default RequestReset;
