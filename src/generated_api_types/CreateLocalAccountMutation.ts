/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateLocalAccountInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateLocalAccountMutation
// ====================================================

export interface CreateLocalAccountMutation_createLocalAccount {
  __typename: "CreateLocalAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface CreateLocalAccountMutation {
  createLocalAccount: CreateLocalAccountMutation_createLocalAccount;
}

export interface CreateLocalAccountMutationVariables {
  createLocalAccountInput: CreateLocalAccountInput;
}
