import { gql } from "@apollo/client";

export const USER_REGISTER = gql`mutation Mutation($id: String!, $email: String!, $name: String!) {
  userRegister(id: $id, email: $email, name: $name) {
    id
    error
    message
  }
}`;

export const USER_GET = gql`query User($id: ID, $email: String) {
  user(id: $id, email: $email) {
    id
    name
    email
    emailVerified
  }
}`;