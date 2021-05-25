/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocalScreeningInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SaveLocalScreeningResponse
// ====================================================

export interface SaveLocalScreeningResponse_saveLocalScreeningResponse {
  __typename: "LocalScreeningOutput";
  error: string | null;
  ok: boolean;
}

export interface SaveLocalScreeningResponse {
  saveLocalScreeningResponse: SaveLocalScreeningResponse_saveLocalScreeningResponse;
}

export interface SaveLocalScreeningResponseVariables {
  saveLocalScreeningResponseInput: LocalScreeningInput;
}
