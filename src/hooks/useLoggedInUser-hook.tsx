import { gql, useQuery } from "@apollo/client";
import { LoggedInUserQuery } from "../generated_api_types/LoggedInUserQuery";

export const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
      accountType
    }
  }
`;

export const useLoggedInUser = () =>
  useQuery<LoggedInUserQuery>(LOGGED_IN_USER_QUERY); // 커스텀 훅의 변수명은 use~로 시작되어야만 함.
