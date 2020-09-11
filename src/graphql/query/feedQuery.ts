import {gql} from '@apollo/client';

const feedQuery = gql`
  query FearchQuery($feedUrl: String!) {
    feed(feedUrl: $feedUrl) {
      pubDate
      text
      title
      subtitle
      description
      image
      summary
      linkUrl
      duration
    }
  }
`;

export default feedQuery;
