import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query Query {
    continents {
      name
      id
    }
  }
`;
