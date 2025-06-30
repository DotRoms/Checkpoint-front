import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      name
      emoji
      code
    }
  }
`;

export const GET_COUNTRY = gql`
  query Query($code: String!) {
    country(code: $code) {
      code
      continent {
        name
      }
      emoji
      name
      id
    }
  }
`;
