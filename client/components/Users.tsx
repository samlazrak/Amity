import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './Core/Error';

const UsersQuery = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

const Users = () => {
  return (
    <Query query={UsersQuery}>
      {({ loading, error, data }) => {
        if (loading) return (<p>Loading...</p>);
        if (error) return (<Error error={error} />);


        return data.users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ));
      }}
    </Query>
  );
};

export default Users;
