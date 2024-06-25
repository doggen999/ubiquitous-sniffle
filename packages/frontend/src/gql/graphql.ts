/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Camera = {
  __typename?: 'Camera';
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  niceName?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCamera: Camera;
  assignCameraToUser?: Maybe<User>;
  removeCameraFromUser?: Maybe<User>;
};


export type MutationAddCameraArgs = {
  address: Scalars['String']['input'];
  name: Scalars['String']['input'];
  niceName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAssignCameraToUserArgs = {
  cameraId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRemoveCameraFromUserArgs = {
  cameraId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  cameras: Array<Camera>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type User = {
  __typename?: 'User';
  cameras: Array<Camera>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQueryQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, name: string, cameras: Array<{ __typename?: 'Camera', id: string, name: string, niceName?: string | null, address: string }> } | null> | null };

export type CamerasQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CamerasQueryQuery = { __typename?: 'Query', cameras: Array<{ __typename?: 'Camera', id: string, name: string, niceName?: string | null, address: string }> };


export const UsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UsersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cameras"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"niceName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]}}]} as unknown as DocumentNode<UsersQueryQuery, UsersQueryQueryVariables>;
export const CamerasQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CamerasQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cameras"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"niceName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]} as unknown as DocumentNode<CamerasQueryQuery, CamerasQueryQueryVariables>;