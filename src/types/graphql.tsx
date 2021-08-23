import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['ID'];
  name: Scalars['String'];
  biography: Scalars['String'];
  isVerified: Scalars['Boolean'];
  coverImage: Asset;
  avatarImage: Asset;
  tracks: PaginatedTrack;
};


export type ArtistTracksArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type ArtistEdge = {
  __typename?: 'ArtistEdge';
  itemCount: Scalars['Float'];
  totalItems: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalPages: Scalars['Float'];
  currentPage: Scalars['Float'];
};

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['ID'];
  type: Scalars['String'];
  meta: AssetMetaUnion;
};

export type AssetMetaUnion = ImageMeta | SoundMeta;

export type ImageMeta = {
  __typename?: 'ImageMeta';
  source: Scalars['String'];
  width: Scalars['Float'];
  height: Scalars['Float'];
};

export type PaginatedArtist = {
  __typename?: 'PaginatedArtist';
  items: Array<Artist>;
  meta: ArtistEdge;
};

export type PaginatedTrack = {
  __typename?: 'PaginatedTrack';
  items: Array<Track>;
  meta: TrackEdge;
};

export type Query = {
  __typename?: 'Query';
  getArtists: PaginatedArtist;
  getArtistById: Artist;
};


export type QueryGetArtistsArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryGetArtistByIdArgs = {
  id: Scalars['String'];
};

export type SoundMeta = {
  __typename?: 'SoundMeta';
  source: Scalars['String'];
  length: Scalars['Float'];
};

export type Track = {
  __typename?: 'Track';
  id: Scalars['ID'];
  name: Scalars['String'];
  sound: Asset;
};

export type TrackEdge = {
  __typename?: 'TrackEdge';
  itemCount: Scalars['Float'];
  totalItems: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalPages: Scalars['Float'];
  currentPage: Scalars['Float'];
};
