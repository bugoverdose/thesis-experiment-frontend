/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { KakaoLoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: KakaoLoginMutation
// ====================================================

export interface KakaoLoginMutation_kakaoLogin {
  __typename: "KakaoLoginOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface KakaoLoginMutation {
  kakaoLogin: KakaoLoginMutation_kakaoLogin;
}

export interface KakaoLoginMutationVariables {
  kakaoLoginInput: KakaoLoginInput;
}
