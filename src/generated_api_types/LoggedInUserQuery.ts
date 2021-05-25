/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountType } from "./globalTypes";

// ====================================================
// GraphQL query operation: LoggedInUserQuery
// ====================================================

export interface LoggedInUserQuery_loggedInUser {
  __typename: "User";
  id: number;
  accountType: AccountType;
}

export interface LoggedInUserQuery {
  loggedInUser: LoggedInUserQuery_loggedInUser;
}
