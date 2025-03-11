/* eslint-disable */
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

export type Mutation = {
  __typename?: 'Mutation';
  createAuction: Auction;
  createBank: Bank;
  deleteAuction: Scalars['Boolean']['output'];
  toggleBankStatus: Bank;
  updateAuction: Auction;
  updateBank: Bank;
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
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
