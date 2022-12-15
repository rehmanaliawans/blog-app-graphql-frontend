import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AccessUserPayload = {
  __typename?: 'AccessUserPayload';
  access_token?: Maybe<Scalars['String']>;
};

export type AllPosts = {
  __typename?: 'AllPosts';
  count?: Maybe<Scalars['Float']>;
  posts?: Maybe<Array<Post>>;
};

export type AllUsersDto = {
  __typename?: 'AllUsersDto';
  count?: Maybe<Scalars['Float']>;
  users?: Maybe<Array<User>>;
};

export type CreatePostInput = {
  attachmentUrl?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  readTime?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type CreatedUser = {
  __typename?: 'CreatedUser';
  access_token: Scalars['String'];
  user: User;
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  userKey: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: CreatedUser;
  createUserPost: ResponseMsgPayload;
  deletePost: ResponseMsgPayload;
  deleteUser: ResponseMsgPayload;
  forgotPassword: ForgotPassword;
  login: AccessUserPayload;
  signUp: CreatedUser;
  updatePassword: ResponseMsgPayload;
  updateUser: ResponseMsgPayload;
  updateUserPost: ResponseMsgPayload;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateUserPostArgs = {
  createPostInput: CreatePostInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  loginUser: LoginUserInput;
};


export type MutationSignUpArgs = {
  signUpUserInput: CreateUserInput;
};


export type MutationUpdatePasswordArgs = {
  passwordUpdateInput: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserPostArgs = {
  updatePostInput: UpdatePostInput;
};

export type PaginateInput = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  PostComments: Array<PostComment>;
  attachmentUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  postComments?: Maybe<Array<PostComment>>;
  readTime?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PostComment = {
  __typename?: 'PostComment';
  commentBody: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  parent?: Maybe<PostComment>;
  post: Post;
  reply?: Maybe<Array<PostComment>>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  fetchAllPosts: AllPosts;
  fetchAllUser: AllUsersDto;
  fetchPost: Post;
  fetchUserPosts: AllPosts;
  findUserById: User;
  searchPost: Array<UserPostEsResponse>;
  searchUserPostES: Array<UserPostEsResponse>;
};


export type QueryFetchAllPostsArgs = {
  paginateInput: PaginateInput;
};


export type QueryFetchAllUserArgs = {
  paginateInput: PaginateInput;
};


export type QueryFetchPostArgs = {
  postId: Scalars['String'];
};


export type QueryFetchUserPostsArgs = {
  paginateInput: PaginateInput;
};


export type QueryFindUserByIdArgs = {
  userId: Scalars['String'];
};


export type QuerySearchPostArgs = {
  queryString: Scalars['String'];
};


export type QuerySearchUserPostEsArgs = {
  queryString: Scalars['String'];
};

export type ResponseMsgPayload = {
  __typename?: 'ResponseMsgPayload';
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type UpdatePasswordInput = {
  password: Scalars['String'];
  userKey: Scalars['String'];
};

export type UpdatePostInput = {
  attachmentUrl?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  readTime?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  resetPasswordTokenExpiredAt?: InputMaybe<Scalars['DateTime']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserPostEsResponse = {
  __typename?: 'UserPostESResponse';
  createdAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  postDescription: Scalars['String'];
  postTitle: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  loginUser: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessUserPayload', access_token?: string | null } };


export const LoginDocument = gql`
    mutation Login($loginUser: LoginUserInput!) {
  login(loginUser: $loginUser) {
    access_token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginUser: // value for 'loginUser'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;