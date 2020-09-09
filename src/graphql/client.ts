import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://frozen-river-77426.herokuapp.com/query',
  cache: new InMemoryCache(),
});

export default client;
