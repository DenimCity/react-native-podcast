/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FearchQuery
// ====================================================

export interface FearchQuery_feed {
  __typename: "FeedItem";
  pubDate: string;
  text: string;
  title: string;
  subtitle: string;
  description: string;
  image: string | null;
  summary: string;
  linkUrl: string;
  duration: string;
}

export interface FearchQuery {
  feed: FearchQuery_feed[];
}

export interface FearchQueryVariables {
  feedUrl: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchQuery
// ====================================================

export interface searchQuery_search {
  __typename: "Podcast";
  artist: string;
  episodesCount: number;
  feedUrl: string;
  thumbnail: string;
  genres: string[];
  podcastName: string;
}

export interface searchQuery {
  search: searchQuery_search[];
}

export interface searchQueryVariables {
  term: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
