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

export type SignupMutationVariables = Exact<{
  signUpUserInput: CreateUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signUp: { __typename?: 'CreatedUser', access_token: string, user: { __typename?: 'User', email: string, lastName: string, id: string, firstName: string, fullName?: string | null } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPassword', userKey: string } };

export type UpdatePasswordMutationVariables = Exact<{
  passwordUpdateInput: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'ResponseMsgPayload', message: string, status: number } };

export type CreateUserPostMutationVariables = Exact<{
  createPostInput: CreatePostInput;
}>;


export type CreateUserPostMutation = { __typename?: 'Mutation', createUserPost: { __typename?: 'ResponseMsgPayload', message: string, status: number } };

export type FetchAllUserQueryVariables = Exact<{
  paginateInput: PaginateInput;
}>;


export type FetchAllUserQuery = { __typename?: 'Query', fetchAllUser: { __typename?: 'AllUsersDto', count?: number | null, users?: Array<{ __typename?: 'User', firstName: string, lastName: string, email: string }> | null } };

export type FetchAllPostsQueryVariables = Exact<{
  paginateInput: PaginateInput;
}>;


export type FetchAllPostsQuery = { __typename?: 'Query', fetchAllPosts: { __typename?: 'AllPosts', count?: number | null, posts?: Array<{ __typename?: 'Post', id: string, title: string, description: string }> | null } };

export type FetchPostByIdQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type FetchPostByIdQuery = { __typename?: 'Query', fetchPost: { __typename?: 'Post', id: string, title: string, description: string, createdAt: any, updatedAt: any, postComments?: Array<{ __typename?: 'PostComment', id: string, commentBody: string, createdAt: any, reply?: Array<{ __typename?: 'PostComment', id: string, commentBody: string }> | null }> | null } };


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
export const SignupDocument = gql`
    mutation Signup($signUpUserInput: CreateUserInput!) {
  signUp(signUpUserInput: $signUpUserInput) {
    access_token
    user {
      email
      lastName
      id
      firstName
      fullName
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signUpUserInput: // value for 'signUpUserInput'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    userKey
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($passwordUpdateInput: UpdatePasswordInput!) {
  updatePassword(passwordUpdateInput: $passwordUpdateInput) {
    message
    status
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      passwordUpdateInput: // value for 'passwordUpdateInput'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const CreateUserPostDocument = gql`
    mutation CreateUserPost($createPostInput: CreatePostInput!) {
  createUserPost(createPostInput: $createPostInput) {
    message
    status
  }
}
    `;
export type CreateUserPostMutationFn = Apollo.MutationFunction<CreateUserPostMutation, CreateUserPostMutationVariables>;

/**
 * __useCreateUserPostMutation__
 *
 * To run a mutation, you first call `useCreateUserPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserPostMutation, { data, loading, error }] = useCreateUserPostMutation({
 *   variables: {
 *      createPostInput: // value for 'createPostInput'
 *   },
 * });
 */
export function useCreateUserPostMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserPostMutation, CreateUserPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserPostMutation, CreateUserPostMutationVariables>(CreateUserPostDocument, options);
      }
export type CreateUserPostMutationHookResult = ReturnType<typeof useCreateUserPostMutation>;
export type CreateUserPostMutationResult = Apollo.MutationResult<CreateUserPostMutation>;
export type CreateUserPostMutationOptions = Apollo.BaseMutationOptions<CreateUserPostMutation, CreateUserPostMutationVariables>;
export const FetchAllUserDocument = gql`
    query FetchAllUser($paginateInput: PaginateInput!) {
  fetchAllUser(paginateInput: $paginateInput) {
    users {
      firstName
      lastName
      email
    }
    count
  }
}
    `;

/**
 * __useFetchAllUserQuery__
 *
 * To run a query within a React component, call `useFetchAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllUserQuery({
 *   variables: {
 *      paginateInput: // value for 'paginateInput'
 *   },
 * });
 */
export function useFetchAllUserQuery(baseOptions: Apollo.QueryHookOptions<FetchAllUserQuery, FetchAllUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllUserQuery, FetchAllUserQueryVariables>(FetchAllUserDocument, options);
      }
export function useFetchAllUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllUserQuery, FetchAllUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllUserQuery, FetchAllUserQueryVariables>(FetchAllUserDocument, options);
        }
export type FetchAllUserQueryHookResult = ReturnType<typeof useFetchAllUserQuery>;
export type FetchAllUserLazyQueryHookResult = ReturnType<typeof useFetchAllUserLazyQuery>;
export type FetchAllUserQueryResult = Apollo.QueryResult<FetchAllUserQuery, FetchAllUserQueryVariables>;
export const FetchAllPostsDocument = gql`
    query FetchAllPosts($paginateInput: PaginateInput!) {
  fetchAllPosts(paginateInput: $paginateInput) {
    posts {
      id
      title
      description
    }
    count
  }
}
    `;

/**
 * __useFetchAllPostsQuery__
 *
 * To run a query within a React component, call `useFetchAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllPostsQuery({
 *   variables: {
 *      paginateInput: // value for 'paginateInput'
 *   },
 * });
 */
export function useFetchAllPostsQuery(baseOptions: Apollo.QueryHookOptions<FetchAllPostsQuery, FetchAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(FetchAllPostsDocument, options);
      }
export function useFetchAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllPostsQuery, FetchAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllPostsQuery, FetchAllPostsQueryVariables>(FetchAllPostsDocument, options);
        }
export type FetchAllPostsQueryHookResult = ReturnType<typeof useFetchAllPostsQuery>;
export type FetchAllPostsLazyQueryHookResult = ReturnType<typeof useFetchAllPostsLazyQuery>;
export type FetchAllPostsQueryResult = Apollo.QueryResult<FetchAllPostsQuery, FetchAllPostsQueryVariables>;
export const FetchPostByIdDocument = gql`
    query FetchPostById($postId: String!) {
  fetchPost(postId: $postId) {
    id
    title
    description
    postComments {
      id
      commentBody
      reply {
        id
        commentBody
      }
      createdAt
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFetchPostByIdQuery__
 *
 * To run a query within a React component, call `useFetchPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostByIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useFetchPostByIdQuery(baseOptions: Apollo.QueryHookOptions<FetchPostByIdQuery, FetchPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPostByIdQuery, FetchPostByIdQueryVariables>(FetchPostByIdDocument, options);
      }
export function useFetchPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPostByIdQuery, FetchPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPostByIdQuery, FetchPostByIdQueryVariables>(FetchPostByIdDocument, options);
        }
export type FetchPostByIdQueryHookResult = ReturnType<typeof useFetchPostByIdQuery>;
export type FetchPostByIdLazyQueryHookResult = ReturnType<typeof useFetchPostByIdLazyQuery>;
export type FetchPostByIdQueryResult = Apollo.QueryResult<FetchPostByIdQuery, FetchPostByIdQueryVariables>;