import React from 'react';
import gql from 'graphql-tag';
import jwt from 'jsonwebtoken';
import { Mutation } from 'react-apollo';
import Error from '../../Core/Error';
import AuthWrapper from '../AuthWrapper';
import VerifyPasswordReset from './VerifyPasswordReset';
import ResetPasswordForm from './ResetForm';
import StatusMessage from '../StatusMessage';
import { changePageTitle } from '../../../utils/Page';

const ResetMutation = gql`
  mutation ResetPasswordMutation($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;

const ResetPassword  = (props: any) => {
  changePageTitle('Reset Password');
  const token: string = props.match.params.token;
  const tokenData = jwt.decode(token) as any;

  // TODO - Check for expired JWT

  return (
    <Mutation mutation={ResetMutation}>
      {(reset, { data, error }) => {
        if (data) {
          return (
            <AuthWrapper>
              <StatusMessage
                message="Your password has been reset."
                link="/login"
                linkText="Continue To Sign In Page"
              />
            </AuthWrapper>
          );
        }

        return (
          <AuthWrapper>
            <VerifyPasswordReset token={token}>
              <Error error={error} />
              <ResetPasswordForm onSubmit={(password: string) => {
                reset({ variables: { token, password }})
              }} />
            </VerifyPasswordReset>
          </AuthWrapper>
        );
      }}
    </Mutation>
  );
};

export default ResetPassword;
