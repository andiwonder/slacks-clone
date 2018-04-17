import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default () => {
  return (
    <div>
      <h1>Hello</h1>
      <AllUsers />
    </div>
  );
};

const AllUsers = () => (
  <Query
    query={gql`
      {
        allUsers {
          id
          username
          email
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.allUsers.map(({ id, username, email }) => (
        <div key={id}>
          <p>{username}</p>
          <p>{email}</p>
        </div>
      ));
    }}
  </Query>
);
