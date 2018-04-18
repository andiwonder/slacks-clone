import React, { Component } from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// TO-DO mutations using apollo client are weird,
// is there another way rather than using the Mutation component
class Register extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  };

  // onSubmit = registerUser => {
  //   console.log(this.state);
  // };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <Mutation mutation={registerMutation}>
        {(registerUser, { data }) => (
          <Container text>
            <Header as="h2">Register</Header>
            <Input name="username" onChange={this.onChange} value={username} placeholder="Username" fluid />
            <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
            <Input name="password" onChange={this.onChange} value={password} placeholder="Password" fluid />
            <Button
              onClick={() => {
                registerUser({ variables: this.state });
              }}
            >
              Submit
            </Button>
          </Container>
        )}
      </Mutation>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default Register;
