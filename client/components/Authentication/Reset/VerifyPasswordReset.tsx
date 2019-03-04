import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../../Core/Error';

const VerifyWrapper = styled.div`
  padding-bottom: 32px;
`;

const VerifyPasswordQuery = gql`
  query VerifyPasswordQuery($token: String!) {
    verifyPasswordReset(token: $token) {
      id
    }
  }
`;

interface Props {
  token: string;
  children: any
};

const VerifyPasswordReset = (props: Props) => {
  return (
    <VerifyWrapper>
      <Query query={VerifyPasswordQuery} variables={{ token: props.token }}>
        {({ loading, error }) => {
          if (loading) return null;
          if (error) return (<Error error={error} />);

          return (
            <div>{props.children}</div>
          );
        }}
      </Query>
    </VerifyWrapper>
  );
};

export default VerifyPasswordReset;
