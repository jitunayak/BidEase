import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type Auction = {
  __typename?: 'Auction';
  bid: Scalars['Float']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emd: Scalars['Float']['output'];
  endsAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  location: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type AuctionInput = {
  bid: Scalars['Float']['input'];
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  emd: Scalars['Float']['input'];
  endsAt: Scalars['String']['input'];
  images: Array<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AuctionUpdateInput = {
  bid?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emd?: InputMaybe<Scalars['Float']['input']>;
  endsAt?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Bank = {
  __typename?: 'Bank';
  active: Scalars['Boolean']['output'];
  address?: Maybe<Scalars['String']['output']>;
  contactPerson: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  subscriptionId?: Maybe<Scalars['String']['output']>;
};

export type BankInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactPerson: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type BankUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Kyc = {
  __typename?: 'KYC';
  aadharNumber: Scalars['String']['output'];
  isAadharVerified: Scalars['Boolean']['output'];
  isPanVerified: Scalars['Boolean']['output'];
  panNumber: Scalars['String']['output'];
};

export type KycInput = {
  aadharNumber?: InputMaybe<Scalars['String']['input']>;
  panNumber?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuction: Auction;
  createBank: Bank;
  deleteAuction: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  toggleBankStatus: Bank;
  updateAuction: Auction;
  updateBank: Bank;
  updateUser: User;
  updateUserInterests: User;
  updateUserKYC: User;
  updateUserNotificationPreferences: User;
};


export type MutationCreateAuctionArgs = {
  input: AuctionInput;
};


export type MutationCreateBankArgs = {
  input: BankInput;
};


export type MutationDeleteAuctionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleBankStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAuctionArgs = {
  id: Scalars['ID']['input'];
  input: AuctionUpdateInput;
};


export type MutationUpdateBankArgs = {
  id: Scalars['ID']['input'];
  input: BankUpdateInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UserUpdateInput;
};


export type MutationUpdateUserInterestsArgs = {
  id: Scalars['ID']['input'];
  interests: Array<Scalars['String']['input']>;
};


export type MutationUpdateUserKycArgs = {
  id: Scalars['ID']['input'];
  input: KycInput;
};


export type MutationUpdateUserNotificationPreferencesArgs = {
  id: Scalars['ID']['input'];
  input: NotificationPreferencesInput;
};

export type NotificationPreferences = {
  __typename?: 'NotificationPreferences';
  emailNotifications: Scalars['Boolean']['output'];
  pushNotifications: Scalars['Boolean']['output'];
  smsNotifications: Scalars['Boolean']['output'];
};

export type NotificationPreferencesInput = {
  emailNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  pushNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  smsNotifications?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  __typename?: 'Query';
  auction?: Maybe<Auction>;
  auctions: Array<Auction>;
  bank?: Maybe<Bank>;
  banks: Array<Bank>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAuctionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAuctionsArgs = {
  bidRange?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBankArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  kyc: Kyc;
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneVerified: Scalars['Boolean']['output'];
  preferences: UserPreferences;
  role: Scalars['String']['output'];
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  interests: Array<Scalars['String']['output']>;
  notifications: NotificationPreferences;
};

export type UserPreferencesInput = {
  interests?: InputMaybe<Array<Scalars['String']['input']>>;
  notifications?: InputMaybe<NotificationPreferencesInput>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  kyc?: InputMaybe<KycInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<UserPreferencesInput>;
};

export type AuctionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AuctionsQuery = { __typename?: 'Query', auctions: Array<{ __typename?: 'Auction', id: string, title: string, description?: string | null, images: Array<string>, bid: number }> };

export type AuctionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AuctionQuery = { __typename?: 'Query', auction?: { __typename?: 'Auction', id: string, title: string, description?: string | null, bid: number, emd: number, category: string, location: string, images: Array<string>, endsAt: string, createdAt: string, updatedAt: string, status: string } | null };

export type UserFragmentFragment = { __typename?: 'User', id: string, name: string, email: string, role: string, phoneNumber?: string | null, phoneVerified: boolean, image?: string | null, preferences: { __typename?: 'UserPreferences', interests: Array<string>, notifications: { __typename?: 'NotificationPreferences', smsNotifications: boolean, pushNotifications: boolean, emailNotifications: boolean } }, kyc: { __typename?: 'KYC', panNumber: string, isPanVerified: boolean, aadharNumber: string, isAadharVerified: boolean } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, role: string, phoneNumber?: string | null, phoneVerified: boolean, image?: string | null, preferences: { __typename?: 'UserPreferences', interests: Array<string>, notifications: { __typename?: 'NotificationPreferences', smsNotifications: boolean, pushNotifications: boolean, emailNotifications: boolean } }, kyc: { __typename?: 'KYC', panNumber: string, isPanVerified: boolean, aadharNumber: string, isAadharVerified: boolean } } | null };

export type UpdateUserInterestsMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  interests: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type UpdateUserInterestsMutation = { __typename?: 'Mutation', updateUserInterests: { __typename?: 'User', id: string, name: string, email: string, role: string, phoneNumber?: string | null, phoneVerified: boolean, image?: string | null, preferences: { __typename?: 'UserPreferences', interests: Array<string>, notifications: { __typename?: 'NotificationPreferences', smsNotifications: boolean, pushNotifications: boolean, emailNotifications: boolean } }, kyc: { __typename?: 'KYC', panNumber: string, isPanVerified: boolean, aadharNumber: string, isAadharVerified: boolean } } };

export type UpdateUserNotificationPreferencesMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  emailNotifications: Scalars['Boolean']['input'];
  pushNotifications: Scalars['Boolean']['input'];
  smsNotifications: Scalars['Boolean']['input'];
}>;


export type UpdateUserNotificationPreferencesMutation = { __typename?: 'Mutation', updateUserNotificationPreferences: { __typename?: 'User', id: string } };

export type UpdateUserBasicInfoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
}>;


export type UpdateUserBasicInfoMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, phoneNumber?: string | null } };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  name
  email
  role
  phoneNumber
  phoneVerified
  image
  preferences {
    interests
    notifications {
      smsNotifications
      pushNotifications
      emailNotifications
    }
  }
  kyc {
    panNumber
    isPanVerified
    aadharNumber
    isAadharVerified
  }
}
    `;
export const AuctionsDocument = gql`
    query Auctions {
  auctions {
    id
    title
    description
    images
    bid
  }
}
    `;

/**
 * __useAuctionsQuery__
 *
 * To run a query within a React component, call `useAuctionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuctionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuctionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuctionsQuery(baseOptions?: Apollo.QueryHookOptions<AuctionsQuery, AuctionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuctionsQuery, AuctionsQueryVariables>(AuctionsDocument, options);
      }
export function useAuctionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuctionsQuery, AuctionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuctionsQuery, AuctionsQueryVariables>(AuctionsDocument, options);
        }
export function useAuctionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AuctionsQuery, AuctionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AuctionsQuery, AuctionsQueryVariables>(AuctionsDocument, options);
        }
export type AuctionsQueryHookResult = ReturnType<typeof useAuctionsQuery>;
export type AuctionsLazyQueryHookResult = ReturnType<typeof useAuctionsLazyQuery>;
export type AuctionsSuspenseQueryHookResult = ReturnType<typeof useAuctionsSuspenseQuery>;
export type AuctionsQueryResult = Apollo.QueryResult<AuctionsQuery, AuctionsQueryVariables>;
export const AuctionDocument = gql`
    query Auction($id: ID!) {
  auction(id: $id) {
    id
    title
    description
    bid
    emd
    category
    location
    images
    endsAt
    createdAt
    updatedAt
    status
  }
}
    `;

/**
 * __useAuctionQuery__
 *
 * To run a query within a React component, call `useAuctionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuctionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuctionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAuctionQuery(baseOptions: Apollo.QueryHookOptions<AuctionQuery, AuctionQueryVariables> & ({ variables: AuctionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuctionQuery, AuctionQueryVariables>(AuctionDocument, options);
      }
export function useAuctionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuctionQuery, AuctionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuctionQuery, AuctionQueryVariables>(AuctionDocument, options);
        }
export function useAuctionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AuctionQuery, AuctionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AuctionQuery, AuctionQueryVariables>(AuctionDocument, options);
        }
export type AuctionQueryHookResult = ReturnType<typeof useAuctionQuery>;
export type AuctionLazyQueryHookResult = ReturnType<typeof useAuctionLazyQuery>;
export type AuctionSuspenseQueryHookResult = ReturnType<typeof useAuctionSuspenseQuery>;
export type AuctionQueryResult = Apollo.QueryResult<AuctionQuery, AuctionQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID!) {
  user(id: $id) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const UpdateUserInterestsDocument = gql`
    mutation UpdateUserInterests($id: ID!, $interests: [String!]!) {
  updateUserInterests(id: $id, interests: $interests) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type UpdateUserInterestsMutationFn = Apollo.MutationFunction<UpdateUserInterestsMutation, UpdateUserInterestsMutationVariables>;

/**
 * __useUpdateUserInterestsMutation__
 *
 * To run a mutation, you first call `useUpdateUserInterestsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInterestsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInterestsMutation, { data, loading, error }] = useUpdateUserInterestsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      interests: // value for 'interests'
 *   },
 * });
 */
export function useUpdateUserInterestsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInterestsMutation, UpdateUserInterestsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInterestsMutation, UpdateUserInterestsMutationVariables>(UpdateUserInterestsDocument, options);
      }
export type UpdateUserInterestsMutationHookResult = ReturnType<typeof useUpdateUserInterestsMutation>;
export type UpdateUserInterestsMutationResult = Apollo.MutationResult<UpdateUserInterestsMutation>;
export type UpdateUserInterestsMutationOptions = Apollo.BaseMutationOptions<UpdateUserInterestsMutation, UpdateUserInterestsMutationVariables>;
export const UpdateUserNotificationPreferencesDocument = gql`
    mutation updateUserNotificationPreferences($id: ID!, $emailNotifications: Boolean!, $pushNotifications: Boolean!, $smsNotifications: Boolean!) {
  updateUserNotificationPreferences(
    id: $id
    input: {emailNotifications: $emailNotifications, pushNotifications: $pushNotifications, smsNotifications: $smsNotifications}
  ) {
    id
  }
}
    `;
export type UpdateUserNotificationPreferencesMutationFn = Apollo.MutationFunction<UpdateUserNotificationPreferencesMutation, UpdateUserNotificationPreferencesMutationVariables>;

/**
 * __useUpdateUserNotificationPreferencesMutation__
 *
 * To run a mutation, you first call `useUpdateUserNotificationPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserNotificationPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserNotificationPreferencesMutation, { data, loading, error }] = useUpdateUserNotificationPreferencesMutation({
 *   variables: {
 *      id: // value for 'id'
 *      emailNotifications: // value for 'emailNotifications'
 *      pushNotifications: // value for 'pushNotifications'
 *      smsNotifications: // value for 'smsNotifications'
 *   },
 * });
 */
export function useUpdateUserNotificationPreferencesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserNotificationPreferencesMutation, UpdateUserNotificationPreferencesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserNotificationPreferencesMutation, UpdateUserNotificationPreferencesMutationVariables>(UpdateUserNotificationPreferencesDocument, options);
      }
export type UpdateUserNotificationPreferencesMutationHookResult = ReturnType<typeof useUpdateUserNotificationPreferencesMutation>;
export type UpdateUserNotificationPreferencesMutationResult = Apollo.MutationResult<UpdateUserNotificationPreferencesMutation>;
export type UpdateUserNotificationPreferencesMutationOptions = Apollo.BaseMutationOptions<UpdateUserNotificationPreferencesMutation, UpdateUserNotificationPreferencesMutationVariables>;
export const UpdateUserBasicInfoDocument = gql`
    mutation updateUserBasicInfo($id: ID!, $name: String!, $email: String!, $phoneNumber: String!) {
  updateUser(
    id: $id
    input: {name: $name, email: $email, phoneNumber: $phoneNumber}
  ) {
    id
    name
    email
    phoneNumber
  }
}
    `;
export type UpdateUserBasicInfoMutationFn = Apollo.MutationFunction<UpdateUserBasicInfoMutation, UpdateUserBasicInfoMutationVariables>;

/**
 * __useUpdateUserBasicInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserBasicInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserBasicInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserBasicInfoMutation, { data, loading, error }] = useUpdateUserBasicInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useUpdateUserBasicInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserBasicInfoMutation, UpdateUserBasicInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserBasicInfoMutation, UpdateUserBasicInfoMutationVariables>(UpdateUserBasicInfoDocument, options);
      }
export type UpdateUserBasicInfoMutationHookResult = ReturnType<typeof useUpdateUserBasicInfoMutation>;
export type UpdateUserBasicInfoMutationResult = Apollo.MutationResult<UpdateUserBasicInfoMutation>;
export type UpdateUserBasicInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserBasicInfoMutation, UpdateUserBasicInfoMutationVariables>;