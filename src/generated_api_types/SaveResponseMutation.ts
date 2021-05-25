/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SaveResponseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveResponseMutation
// ====================================================

export interface SaveResponseMutation_saveResponse {
  __typename: "SaveResponseOutput";
  error: string | null;
  ok: boolean;
}

export interface SaveResponseMutation {
  saveResponse: SaveResponseMutation_saveResponse;
}

export interface SaveResponseMutationVariables {
  saveResponseInput: SaveResponseInput;
}
