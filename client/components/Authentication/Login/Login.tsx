import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import AuthWrapper from '../AuthWrapper';
import LoginForm from './LoginForm';
import OktaSignIn from './OktaSignIn';
import Error from '../../Core/Error';
import SuccessRedirect from './SuccessRedirect';
import { changePageTitle } from '../../../utils/Page';
import {
  userIsSignedIn,
  saveAuthToken,
  setLoginPlaceholderEmail,
} from '../../../utils/Authentication';

const LoginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Login = (props: any) => (
  <Mutation mutation={LoginMutation}>
    {(login, { data, error }) => {
      if (userIsSignedIn()) return (<SuccessRedirect />);
      changePageTitle('Sign In');

      if (data) {
        console.log(data);
        setLoginPlaceholderEmail(data.authenticate.user.email);
        saveAuthToken(data.authenticate.token);
        return (<SuccessRedirect />);
      }

      return (
        <AuthWrapper>
          <Error error={error} />
          <LoginForm onSubmit={login} />
          <OktaSignIn />
          <Link className="auth-link" to="/request-reset">Forgot your password?</Link>
        </AuthWrapper>
      );
    }}
  </Mutation>
);

export default Login;
