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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};




export type Album = {
  __typename?: 'Album';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  coverImageId: Scalars['String'];
  coverImage: Asset;
  artistId: Scalars['String'];
  allArtists: Array<Artist>;
  tracks: Array<Track>;
  isLiked: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['ID'];
  name: Scalars['String'];
  biography: Scalars['String'];
  isVerified: Scalars['Boolean'];
  coverImageId: Scalars['String'];
  coverImage: Asset;
  avatarImageId: Scalars['String'];
  avatarImage: Asset;
  tracks: PaginatedTrack;
  isLiked: Scalars['Boolean'];
};


export type ArtistTracksArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['ID'];
  type: Scalars['String'];
  meta: AssetMetaUnion;
};

export type AssetMetaUnion = ImageMeta | SoundMeta;


export type Genre = {
  __typename?: 'Genre';
  id: Scalars['ID'];
  name: Scalars['String'];
  coverImageId: Scalars['String'];
  coverImage: Asset;
  playlists: PaginatedPlaylist;
};


export type GenrePlaylistsArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type ImageMeta = {
  __typename?: 'ImageMeta';
  source: Scalars['String'];
  dominantColor: Scalars['String'];
  width: Scalars['Float'];
  height: Scalars['Float'];
};

export type Likeable = {
  __typename?: 'Likeable';
  likeableId: Scalars['String'];
  likeableType: Scalars['String'];
  userId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  album?: Maybe<Album>;
  artist?: Maybe<Artist>;
  track?: Maybe<Track>;
  playlist?: Maybe<Playlist>;
};

export type LikeableType =
  | 'TRACK'
  | 'ALBUM'
  | 'ARTIST'
  | 'PLAYLIST';

export type Mutation = {
  __typename?: 'Mutation';
  like: Scalars['Boolean'];
  createPlaylist: Playlist;
  updatePlaylist: Playlist;
  deletePlaylist: Playlist;
  addTrackToPlaylist: Playlist;
  loginBySocialProvider: UserWithAccessToken;
};


export type MutationLikeArgs = {
  likeableType: LikeableType;
  likeableId: Scalars['String'];
};


export type MutationCreatePlaylistArgs = {
  name: Scalars['String'];
};


export type MutationUpdatePlaylistArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeletePlaylistArgs = {
  id: Scalars['String'];
};


export type MutationAddTrackToPlaylistArgs = {
  playlistId: Scalars['String'];
  trackId: Scalars['String'];
};


export type MutationLoginBySocialProviderArgs = {
  idToken: Scalars['String'];
  providerId: Scalars['String'];
};

export type PaginatedArtist = {
  __typename?: 'PaginatedArtist';
  items: Array<Artist>;
  pageInfo: PaginationMeta;
};

export type PaginatedLikeable = {
  __typename?: 'PaginatedLikeable';
  items: Array<Likeable>;
  pageInfo: PaginationMeta;
};

export type PaginatedPlaylist = {
  __typename?: 'PaginatedPlaylist';
  items: Array<Playlist>;
  pageInfo: PaginationMeta;
};

export type PaginatedTrack = {
  __typename?: 'PaginatedTrack';
  items: Array<Track>;
  pageInfo: PaginationMeta;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  itemCount: Scalars['Float'];
  totalItems: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalPages: Scalars['Float'];
  currentPage: Scalars['Float'];
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['ID'];
  name: Scalars['String'];
  userId: Scalars['String'];
  coverImageId?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Asset>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  tracksCount: Scalars['Float'];
  tracks: PaginatedTrack;
};


export type PlaylistTracksArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  artists: PaginatedArtist;
  artist: Artist;
  track: Track;
  likeables: PaginatedLikeable;
  album: Album;
  getOwnPlaylists: Array<Playlist>;
  playlist?: Maybe<Playlist>;
  genres: Array<Genre>;
  genre: Genre;
  whoAmI: User;
  user: User;
};


export type QueryArtistsArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryArtistArgs = {
  id: Scalars['String'];
};


export type QueryTrackArgs = {
  id: Scalars['String'];
};


export type QueryLikeablesArgs = {
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryAlbumArgs = {
  id: Scalars['String'];
};


export type QueryPlaylistArgs = {
  id: Scalars['String'];
};


export type QueryGenreArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
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
  albumId: Scalars['String'];
  sound: Asset;
  artists: Array<Artist>;
  isLiked: Scalars['Boolean'];
  album: Album;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserWithAccessToken = {
  __typename?: 'UserWithAccessToken';
  user: User;
  accessToken: Scalars['String'];
};
