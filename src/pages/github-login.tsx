// import { useMutation } from "@apollo/client";
// import gql from "graphql-tag";
// import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
// import { useHistory, useLocation } from "react-router";
// import { authTokenVar, isLoggedInVar } from "../apollo";
// import { LOCALSTORAGE_TOKEN } from "../constants";
// import {
//   GithubLoginMutation,
//   GithubLoginMutationVariables,
// } from "../generated_api_types/GithubLoginMutation";
// import { commonRoute } from "../routers/routes";

// export const GITHUB_LOGIN_MUTATION = gql`
//   mutation GithubLoginMutation($githubLoginInput: GithubLoginInput!) {
//     githubLogin(input: $githubLoginInput) {
//       ok
//       error
//       token
//     }
//   }
// `;

export const GithubLogin: React.FC = () => {
  // const history = useHistory();
  // const location = useLocation();
  // const code = location.search.split("?code=")[1];

  // const onMutationCompleted = (data: GithubLoginMutation) => {
  //   const {
  //     githubLogin: { ok, token },
  //   } = data;
  //   if (ok && token) {
  //     localStorage.setItem(LOCALSTORAGE_TOKEN, token); // 인증된 토큰 브라우저에 저장. 웹사이트 재방문시, localstorage의 토큰으로 자동 로그인 가능.
  //     authTokenVar(token);
  //     isLoggedInVar(true); // apollo.ts에서 설정한 reactive variable둘의 값 업데이트.
  //   }
  //   history.push(commonRoute.home);
  //   window.location.reload(); // 디버그 목적: LoggedInRouter 내에서 제대로 된 컴포넌트가 렌더링되지 않음. 문제점: 캐쉬가 완전히 지워짐.
  // };

  // const [getGithubTokenMutation, { loading: loadingMutation }] = useMutation<
  //   GithubLoginMutation,
  //   GithubLoginMutationVariables
  // >(GITHUB_LOGIN_MUTATION, { onCompleted: onMutationCompleted });

  // const sendMutation = () => {
  //   if (!loadingMutation) {
  //     getGithubTokenMutation({
  //       variables: {
  //         githubLoginInput: { code },
  //       },
  //     });
  //   }
  // };

  // //  eslint-disable-next-line
  // useEffect(sendMutation, []);

  return (
    <main className="w-full h-screen bg-white">
      <Helmet>
        <title>Loading | havom</title>
      </Helmet>
      <div className="w-full h-full flex items-center justify-center font-bold text-3xl">
        Loading...
      </div>
    </main>
  );
};
