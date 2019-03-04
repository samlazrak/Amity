import React from 'react';
import jwt from 'jsonwebtoken';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import AuthWrapper from '../AuthWrapper';
import RegisterForm from './RegisterForm';
import StatusMessage from '../StatusMessage';
import Error from '../../Core/Error';

const RegisterMutatation = gql`
  mutation RegisterMutation($token: String!, $user: UserInput!) {
    createUser(token: $token, input: $user) {
      id
    }
  }
`;

const Register = (props: any) => {
  const token = props.match.params.token;
  const tokenData = jwt.decode(token) as any;

  // TODO - Error handling for invalid invite JWTs

  return (
    <Mutation mutation={RegisterMutatation}>
      {(register, { data, error }) => {
        return (
          <AuthWrapper>
            <Error error={error} />
            {!data &&
              <RegisterForm data={tokenData} onSubmit={(user: any) => {
                register({ variables: { token, user }});
              }} />
            }
            {data &&
              <StatusMessage
                message="Your account has been created!"
                link="/login"
                linkText="Continue to Sign In Page"
              />
            }
          </AuthWrapper>
        );
      }}
    </Mutation>
  );
};

export default Register;
