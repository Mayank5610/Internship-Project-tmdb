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
        originalLanguage: $originalLanguage
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

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie(
    $id: ID!
    $title: String!
    $overview: String!
    $adult: Boolean!
    $originalTitle: String!
    $originalLanguage: String!
    $budget: Int!
    $revenue: Int!
    $releaseDate: Date!
    $runtime: Int!
    $status: String!
    $tagline: String!
  ) {
    updateMovie(
      id: $id
      data: {
        title: $title
        overview: $overview
        adult: $adult
        originalTitle: $originalTitle
        originalLanguage: $originalLanguage
        budget: $budget
        revenue: $revenue
        releaseDate: $releaseDate
        runtime: $runtime
        status: $status
        tagline: $tagline
      }
    ) {
      message
      data {
        movie {
          id
          title
          overview
          adult
          originalTitle
          originalLanguage
          budget
          revenue
          releaseDate
          runtime
          status
          tagline
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

export const CREATE_PERSON = gql`
  mutation CreatePerson(
    $name: String!
    $gender: GenderType
    $biography: String
    $birthday: DateTime
    $adult: Boolean
    $placeOfBirth: String
    $alsoKnownAs: [String]
  ) {
    createPerson(
      data: {
        name: $name
        gender: $gender
        biography: $biography
        birthday: $birthday
        adult: $adult
        placeOfBirth: $placeOfBirth
        alsoKnownAs: $alsoKnownAs
      }
    ) {
      data {
        id
        name
        gender
        biography
        birthday
        adult
        placeOfBirth
        alsoKnownAs
      }
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson(
    $id: ID!
    $name: String
    $biography: String
    $gender: GenderType
    $adult: Boolean
    $birthday: DateTime
    $placeOfBirth: String
    $alsoKnownAs: [String]
  ) {
    updatePerson(
      id: $id
      data: {
        name: $name
        biography: $biography
        gender: $gender
        adult: $adult
        birthday: $birthday
        placeOfBirth: $placeOfBirth
        alsoKnownAs: $alsoKnownAs
      }
    ) {
      message
      data {
        id
        name
        biography
        gender
        adult
        birthday
        placeOfBirth
        alsoKnownAs
      }
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
