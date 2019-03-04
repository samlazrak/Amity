import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const UserProfile = styled.div`
  display: none;
  margin-left: auto;
  color: #000;
  padding: 20px 20px 0;

  @media screen and (min-width: 55em) {
    display: block;
  }

  .profile-photo {
    width: 45px;
    float: left;

    img {
      border-radius: 55px;
      padding: 3px;
      border: 2px solid #79B2AA;
    }
  }

  p {
    color: #3B3F4F;
    float: left;
    margin: 12px 0 15px 8px;
    padding: 0;
  }
`;

const CurrentUserQuery = gql`
  {
    me {
      id
      name
      email
      bambooProfile {
        photoUrl
      }
    }
  }
`;

export default () => {
  return (
    <Query query={CurrentUserQuery}>
      {({error, loading, data}) => {
        if (error || loading) return null;
        if (!data.me.bambooProfile) return null;

        return (
          <UserProfile>
            <div className="profile-photo">
              <img src={data.me.bambooProfile.photoUrl} />
            </div>
            <p>{data.me.name}</p>
          </UserProfile>
        );
      }}
    </Query>
  );
};
