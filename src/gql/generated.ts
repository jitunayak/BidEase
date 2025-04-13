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

export type Advertisement = {
  __typename?: 'Advertisement';
  actionUrl: Scalars['String']['output'];
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  sponsor: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Auction = {
  __typename?: 'Auction';
  bankId: Scalars['Int']['output'];
  bankName: Scalars['String']['output'];
  basePrice: Scalars['Float']['output'];
  bidCount: Scalars['Int']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  currentBid?: Maybe<Scalars['Float']['output']>;
  description: Scalars['String']['output'];
  emd?: Maybe<Scalars['Float']['output']>;
  endTime: Scalars['String']['output'];
  featured: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  incrementAmount: Scalars['Float']['output'];
  location: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
  startingBid?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  viewCount: Scalars['Int']['output'];
};

export type AuctionInput = {
  bankId: Scalars['Int']['input'];
  bankName: Scalars['String']['input'];
  basePrice: Scalars['Float']['input'];
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  emd?: InputMaybe<Scalars['Float']['input']>;
  endTime: Scalars['String']['input'];
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  images: Array<Scalars['String']['input']>;
  incrementAmount: Scalars['Float']['input'];
  location: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  startingBid?: InputMaybe<Scalars['Float']['input']>;
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AuctionUpdateInput = {
  bankName?: InputMaybe<Scalars['String']['input']>;
  basePrice?: InputMaybe<Scalars['Float']['input']>;
  bidCount?: InputMaybe<Scalars['Int']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  currentBid?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  emd?: InputMaybe<Scalars['Float']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  incrementAmount?: InputMaybe<Scalars['Float']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  startingBid?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  viewCount?: InputMaybe<Scalars['Int']['input']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
  user?: Maybe<User>;
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

export type Banner = {
  __typename?: 'Banner';
  actionText: Scalars['String']['output'];
  actionUrl: Scalars['String']['output'];
  active: Scalars['Boolean']['output'];
  backgroundColor: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  subtitle: Scalars['String']['output'];
  textColor: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type BannerInput = {
  actionText: Scalars['String']['input'];
  actionUrl: Scalars['String']['input'];
  backgroundColor: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  subtitle: Scalars['String']['input'];
  textColor: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type BannerUpdateInput = {
  actionText?: InputMaybe<Scalars['String']['input']>;
  actionUrl?: InputMaybe<Scalars['String']['input']>;
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  textColor?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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
  addToWishlist?: Maybe<Wishlist>;
  createAuction: Auction;
  createBank: Bank;
  createBanner: Banner;
  deleteAuction: Scalars['Boolean']['output'];
  deleteBanner: Scalars['Boolean']['output'];
  deleteNotification: Scalars['Boolean']['output'];
  deleteUser: Scalars['ID']['output'];
  markNotificationAsRead: Notification;
  removeFromWishlist?: Maybe<Scalars['Boolean']['output']>;
  sendOtp: Scalars['String']['output'];
  toggleBankStatus: Bank;
  toggleBannerStatus: Banner;
  updateAuction: Auction;
  updateBank: Bank;
  updateBanner: Banner;
  updateUser: User;
  updateUserInterests: User;
  updateUserKYC: User;
  updateUserNotificationPreferences: User;
  verifyOtp: AuthResponse;
};


export type MutationAddToWishlistArgs = {
  auctionId: Scalars['Int']['input'];
};


export type MutationCreateAuctionArgs = {
  input: AuctionInput;
};


export type MutationCreateBankArgs = {
  input: BankInput;
};


export type MutationCreateBannerArgs = {
  input: BannerInput;
};


export type MutationDeleteAuctionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBannerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveFromWishlistArgs = {
  auctionId: Scalars['Int']['input'];
};


export type MutationSendOtpArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type MutationToggleBankStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleBannerStatusArgs = {
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


export type MutationUpdateBannerArgs = {
  id: Scalars['ID']['input'];
  input: BannerUpdateInput;
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


export type MutationVerifyOtpArgs = {
  otp: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  relatedId?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
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
  advertisement?: Maybe<Advertisement>;
  advertisements?: Maybe<Array<Maybe<Advertisement>>>;
  auction?: Maybe<Auction>;
  auctions: Array<Auction>;
  bank?: Maybe<Bank>;
  banks: Array<Bank>;
  banner?: Maybe<Banner>;
  banners: Array<Banner>;
  isWishListed: WishlistStatus;
  notifications: Array<Notification>;
  user?: Maybe<User>;
  users: Array<User>;
  wishlist: Array<Wishlist>;
};


export type QueryAdvertisementArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAuctionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAuctionsArgs = {
  bidRange?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  category?: InputMaybe<Scalars['String']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBankArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBannerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIsWishListedArgs = {
  auctionId: Scalars['Int']['input'];
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

export type Wishlist = {
  __typename?: 'Wishlist';
  auction: Auction;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type WishlistStatus = {
  __typename?: 'WishlistStatus';
  isWishListed: Scalars['Boolean']['output'];
};

export type AuctionsQueryVariables = Exact<{
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  bidRange?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>> | InputMaybe<Scalars['Float']['input']>>;
}>;


export type AuctionsQuery = { __typename?: 'Query', auctions: Array<{ __typename?: 'Auction', id: string, title: string, currentBid?: number | null, description: string, category: string, location: string, images: Array<string>, createdAt: string, updatedAt: string, status: string, bankId: number, featured: boolean, basePrice: number, startTime: string, endTime: string, viewCount: number, startingBid?: number | null }> };

export type AuctionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AuctionQuery = { __typename?: 'Query', auction?: { __typename?: 'Auction', id: string, title: string, description: string, emd?: number | null, category: string, location: string, images: Array<string>, createdAt: string, updatedAt: string, status: string, bankId: number, featured: boolean, basePrice: number, startTime: string, endTime: string, viewCount: number, startingBid?: number | null } | null };

export type GetBannersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBannersQuery = { __typename?: 'Query', banners: Array<{ __typename?: 'Banner', id: string, title: string, imageUrl: string, actionText: string, updatedAt: string, actionUrl: string, active: boolean, backgroundColor: string, createdAt: string, subtitle: string, textColor: string }> };

export type UserFragmentFragment = { __typename?: 'User', id: string, name: string, email: string, role: string, phoneNumber?: string | null, image?: string | null, preferences: { __typename?: 'UserPreferences', interests: Array<string>, notifications: { __typename?: 'NotificationPreferences', smsNotifications: boolean, pushNotifications: boolean, emailNotifications: boolean } }, kyc: { __typename?: 'KYC', panNumber: string, isPanVerified: boolean, aadharNumber: string, isAadharVerified: boolean } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, role: string, phoneNumber?: string | null, image?: string | null, preferences: { __typename?: 'UserPreferences', interests: Array<string>, notifications: { __typename?: 'NotificationPreferences', smsNotifications: boolean, pushNotifications: boolean, emailNotifications: boolean } }, kyc: { __typename?: 'KYC', panNumber: string, isPanVerified: boolean, aadharNumber: string, isAadharVerified: boolean } } | null };

export type UpdateUserInterestsMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  interests: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type UpdateUserInterestsMutation = { __typename?: 'Mutation', updateUserInterests: { __typename?: 'User', id: string, name: string, email: string, role: string, phoneNumber?: string | null, image?: string | null, preferences: { __typename?: 'UserPreferences', interests: Array<string>, notifications: { __typename?: 'NotificationPreferences', smsNotifications: boolean, pushNotifications: boolean, emailNotifications: boolean } }, kyc: { __typename?: 'KYC', panNumber: string, isPanVerified: boolean, aadharNumber: string, isAadharVerified: boolean } } };

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


export type UpdateUserBasicInfoMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, role: string, phoneNumber?: string | null, image?: string | null, preferences: { __typename?: 'UserPreferences', interests: Array<string>, notifications: { __typename?: 'NotificationPreferences', smsNotifications: boolean, pushNotifications: boolean, emailNotifications: boolean } }, kyc: { __typename?: 'KYC', panNumber: string, isPanVerified: boolean, aadharNumber: string, isAadharVerified: boolean } } };

export type SendOtpMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp: string };

export type VerifyOtpMutationVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'AuthResponse', token: string, id: string, user?: { __typename?: 'User', id: string } | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: string };

export type GetWishlistsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWishlistsQuery = { __typename?: 'Query', wishlist: Array<{ __typename?: 'Wishlist', id: number, createdAt: string, auction: { __typename?: 'Auction', id: string, title: string, location: string, emd?: number | null, startTime: string, startingBid?: number | null, images: Array<string> } }> };

export type AddToWishlistMutationVariables = Exact<{
  auctionId: Scalars['Int']['input'];
}>;


export type AddToWishlistMutation = { __typename?: 'Mutation', addToWishlist?: { __typename?: 'Wishlist', id: number } | null };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  name
  email
  role
  phoneNumber
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
    query Auctions($featured: Boolean, $category: String, $location: String, $bidRange: [Float]) {
  auctions(
    featured: $featured
    category: $category
    location: $location
    bidRange: $bidRange
  ) {
    id
    title
    currentBid
    description
    category
    location
    images
    createdAt
    updatedAt
    status
    bankId
    featured
    location
    basePrice
    location
    startTime
    endTime
    viewCount
    startingBid
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
 *      featured: // value for 'featured'
 *      category: // value for 'category'
 *      location: // value for 'location'
 *      bidRange: // value for 'bidRange'
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
    emd
    category
    location
    images
    createdAt
    updatedAt
    status
    bankId
    featured
    location
    basePrice
    location
    startTime
    endTime
    viewCount
    startingBid
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
export const GetBannersDocument = gql`
    query getBanners {
  banners {
    id
    title
    imageUrl
    actionText
    updatedAt
    actionUrl
    active
    backgroundColor
    createdAt
    subtitle
    textColor
  }
}
    `;

/**
 * __useGetBannersQuery__
 *
 * To run a query within a React component, call `useGetBannersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBannersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBannersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBannersQuery(baseOptions?: Apollo.QueryHookOptions<GetBannersQuery, GetBannersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBannersQuery, GetBannersQueryVariables>(GetBannersDocument, options);
      }
export function useGetBannersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBannersQuery, GetBannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBannersQuery, GetBannersQueryVariables>(GetBannersDocument, options);
        }
export function useGetBannersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBannersQuery, GetBannersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBannersQuery, GetBannersQueryVariables>(GetBannersDocument, options);
        }
export type GetBannersQueryHookResult = ReturnType<typeof useGetBannersQuery>;
export type GetBannersLazyQueryHookResult = ReturnType<typeof useGetBannersLazyQuery>;
export type GetBannersSuspenseQueryHookResult = ReturnType<typeof useGetBannersSuspenseQuery>;
export type GetBannersQueryResult = Apollo.QueryResult<GetBannersQuery, GetBannersQueryVariables>;
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
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
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
export const SendOtpDocument = gql`
    mutation sendOtp($phoneNumber: String!) {
  sendOtp(phoneNumber: $phoneNumber)
}
    `;
export type SendOtpMutationFn = Apollo.MutationFunction<SendOtpMutation, SendOtpMutationVariables>;

/**
 * __useSendOtpMutation__
 *
 * To run a mutation, you first call `useSendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpMutation, { data, loading, error }] = useSendOtpMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useSendOtpMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpMutation, SendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpMutation, SendOtpMutationVariables>(SendOtpDocument, options);
      }
export type SendOtpMutationHookResult = ReturnType<typeof useSendOtpMutation>;
export type SendOtpMutationResult = Apollo.MutationResult<SendOtpMutation>;
export type SendOtpMutationOptions = Apollo.BaseMutationOptions<SendOtpMutation, SendOtpMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation verifyOtp($phoneNumber: String!, $otp: String!) {
  verifyOtp(phoneNumber: $phoneNumber, otp: $otp) {
    token
    id
    user {
      id
    }
  }
}
    `;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetWishlistsDocument = gql`
    query getWishlists {
  wishlist {
    id
    createdAt
    auction {
      id
      title
      location
      emd
      startTime
      startingBid
      images
    }
  }
}
    `;

/**
 * __useGetWishlistsQuery__
 *
 * To run a query within a React component, call `useGetWishlistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWishlistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWishlistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWishlistsQuery(baseOptions?: Apollo.QueryHookOptions<GetWishlistsQuery, GetWishlistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWishlistsQuery, GetWishlistsQueryVariables>(GetWishlistsDocument, options);
      }
export function useGetWishlistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWishlistsQuery, GetWishlistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWishlistsQuery, GetWishlistsQueryVariables>(GetWishlistsDocument, options);
        }
export function useGetWishlistsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWishlistsQuery, GetWishlistsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWishlistsQuery, GetWishlistsQueryVariables>(GetWishlistsDocument, options);
        }
export type GetWishlistsQueryHookResult = ReturnType<typeof useGetWishlistsQuery>;
export type GetWishlistsLazyQueryHookResult = ReturnType<typeof useGetWishlistsLazyQuery>;
export type GetWishlistsSuspenseQueryHookResult = ReturnType<typeof useGetWishlistsSuspenseQuery>;
export type GetWishlistsQueryResult = Apollo.QueryResult<GetWishlistsQuery, GetWishlistsQueryVariables>;
export const AddToWishlistDocument = gql`
    mutation addToWishlist($auctionId: Int!) {
  addToWishlist(auctionId: $auctionId) {
    id
  }
}
    `;
export type AddToWishlistMutationFn = Apollo.MutationFunction<AddToWishlistMutation, AddToWishlistMutationVariables>;

/**
 * __useAddToWishlistMutation__
 *
 * To run a mutation, you first call `useAddToWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToWishlistMutation, { data, loading, error }] = useAddToWishlistMutation({
 *   variables: {
 *      auctionId: // value for 'auctionId'
 *   },
 * });
 */
export function useAddToWishlistMutation(baseOptions?: Apollo.MutationHookOptions<AddToWishlistMutation, AddToWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToWishlistMutation, AddToWishlistMutationVariables>(AddToWishlistDocument, options);
      }
export type AddToWishlistMutationHookResult = ReturnType<typeof useAddToWishlistMutation>;
export type AddToWishlistMutationResult = Apollo.MutationResult<AddToWishlistMutation>;
export type AddToWishlistMutationOptions = Apollo.BaseMutationOptions<AddToWishlistMutation, AddToWishlistMutationVariables>;