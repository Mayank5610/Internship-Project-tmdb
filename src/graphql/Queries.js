import { gql } from "@apollo/client";

export const TOP_RATED_MOVIES = gql`
  query {
    movies(
      filter: { limit: 5, skip: 0 }
      sort: { order: ASC, field: popularity }
    ) {
      data {
        id
        title
        overview
        originalTitle
        originalLanguage
        releaseDate
        adult
      }
    }
  }
`;

export const GET_LIST_MOVIES = gql`
  query GetListMovies(
    $limit: Int
    $skip: Int
    $order: SortOrder
    $category: MoviesCategory
    $searchTerm: String
  ) {
    listMovies(
      filter: {
        limit: $limit
        skip: $skip
        category: $category
        searchTerm: $searchTerm
      }
      sort: { order: $order, field: releaseDate }
    ) {
      data {
        id
        title
        overview
        releaseDate
        originalTitle
        originalLanguage
        releaseDate
      }
    }
  }
`;

export const GET_MOVIE_DETAILS = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      data {
        id
        title
        overview
        adult
        originalLanguage
        originalTitle
        popularity
        budget
        revenue
        releaseDate
        runtime
        status
        tagline
      }
    }
  }
`;

export const GET_LIST_PERSONS = gql`
  query ListPersons(
    $limit: Int
    $skip: Int
    $field: ListPersonsSortFields
    $order: SortOrder
  ) {
    listPersons(
      filter: { limit: $limit, skip: $skip }
      sort: { field: $field, order: $order }
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
      count
    }
  }
`;
