/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocalLoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LocalLoginMutation
// ====================================================

export interface LocalLoginMutation_localLogin {
  __typename: "LocalLoginOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface LocalLoginMutation {
  localLogin: LocalLoginMutation_localLogin;
}

export interface LocalLoginMutationVariables {
  localLoginInput: LocalLoginInput;
}
