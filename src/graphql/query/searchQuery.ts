import {gql} from '@apollo/client';

const searchQuery = gql`
  query searchQuery($term: String!) {
    search(term: $term) {
      artist
      episodesCount
      feedUrl
      thumbnail
      genres
      podcastName
    }
  }
`;

export default searchQuery;
