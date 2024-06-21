import { gql } from "@apollo/client";

export const LOGIN_EMAIL_PASSWORD = gql`
  mutation EmailPasswordLogin($email: String!, $password: String!) {
    emailPasswordLogIn(data: { email: $email, password: $password }) {
      message
      data {
        token
      }
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation CreateMovie(
    $title: String!
    $overview: String!
    $adult: Boolean!
    $budget: Int!
    $originalTitle: String!
    $originalLanguage: String!
    $releaseDate: Date!
    $revenue: Int!
    $runtime: Int!
    $status: String!
    $tagline: String!
  ) {
    createMovie(
      data: {
        title: $title
        overview: $overview
        adult: $adult
        budget: $budget
        originalTitle: $originalTitle
        originalLanguage: $originalLangu
        releaseDate: $releaseDate
        revenue: $revenue
        runtime: $runtime
        status: $status
        tagline: $tagline
      }
    ) {
      data {
        movie {
          id
          title
          overview
          adult
          releaseDate
          originalTitle
          originalLanguage
        }
      }
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      message
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id) {
      message
    }
  }
`;
