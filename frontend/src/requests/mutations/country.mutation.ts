import { gql } from "@apollo/client";

export const ADD_COUNTRY = gql`
  mutation Mutation($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      continent {
        name
      }
      emoji
      name
    }
  }
`;
