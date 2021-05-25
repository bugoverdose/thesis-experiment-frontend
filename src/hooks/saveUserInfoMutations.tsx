import { gql } from "@apollo/client";

export const SAVE_USER_INFO_RESPONSE_MUTATION = gql`
  mutation SaveUserInfoResponse(
    $saveUserInfoResponseInput: SaveUserInfoResponseInput!
  ) {
    saveUserInfoResponse(input: $saveUserInfoResponseInput) {
      error
      ok
    }
  }
`;

export const SAVE_ADDRESS_RESPONSE_MUTATION = gql`
  mutation SaveAddressResponse(
    $saveAddressResponseInput: SaveAddressResponseInput!
  ) {
    saveAddressResponse(input: $saveAddressResponseInput) {
      error
      ok
    }
  }
`;

export const SAVE_LOCAL_SCREENING_MUTATION = gql`
  mutation SaveLocalScreeningResponse(
    $saveLocalScreeningResponseInput: LocalScreeningInput!
  ) {
    saveLocalScreeningResponse(input: $saveLocalScreeningResponseInput) {
      error
      ok
    }
  }
`;
