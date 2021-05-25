/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SaveUserInfoResponseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveUserInfoResponse
// ====================================================

export interface SaveUserInfoResponse_saveUserInfoResponse {
  __typename: "SaveUserInfoResponseOutput";
  error: string | null;
  ok: boolean;
}

export interface SaveUserInfoResponse {
  saveUserInfoResponse: SaveUserInfoResponse_saveUserInfoResponse;
}

export interface SaveUserInfoResponseVariables {
  saveUserInfoResponseInput: SaveUserInfoResponseInput;
}
