/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AccountType {
  Kakao = "Kakao",
  Local = "Local",
}

export interface CreateLocalAccountInput {
  localId: string;
  password: string;
}

export interface KakaoLoginInput {
  code: string;
}

export interface LocalLoginInput {
  localId: string;
  password: string;
}

export interface LocalScreeningInput {
  response: string;
}

export interface SaveAddressResponseInput {
  response: string;
}

export interface SaveResponseInput {
  questionNum: number;
  response: number;
}

export interface SaveUserInfoResponseInput {
  target: string;
  response: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
