/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SaveAddressResponseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveAddressResponse
// ====================================================

export interface SaveAddressResponse_saveAddressResponse {
  __typename: "SaveAddressResponseOutput";
  error: string | null;
  ok: boolean;
}

export interface SaveAddressResponse {
  saveAddressResponse: SaveAddressResponse_saveAddressResponse;
}

export interface SaveAddressResponseVariables {
  saveAddressResponseInput: SaveAddressResponseInput;
}
