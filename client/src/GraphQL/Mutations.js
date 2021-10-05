import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  # createUser is from server side
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String
  ) {
    # createUser 
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      # after mutation  this is what is being returned
      id
    }
  }
`;
