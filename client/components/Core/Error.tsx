import React from 'react';
import styled from 'styled-components';
import { ApolloError } from 'apollo-boost';

const ErrorMessage = styled.p`
  padding: 0;
  margin: 15px 0 -15px;
  font-size: 16px;
`;

const Error = ({ error }: { error: ApolloError|string|undefined }) => {
  if (!error) return null;

  if (typeof error === 'string') {
    return (
      <ErrorMessage>
        {error}
      </ErrorMessage>
    );
  }

  return (
    <ErrorMessage>
      {error.graphQLErrors.map(({ message }, i) => (
        <span key={i}>{message}</span>
      ))}
    </ErrorMessage>
  );
};

export default Error;
