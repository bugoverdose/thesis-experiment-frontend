import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import {
  KakaoLoginMutation,
  KakaoLoginMutationVariables,
} from "../../generated_api_types/KakaoLoginMutation";

export const KAKAO_LOGIN_MUTATION = gql`
  mutation KakaoLoginMutation($kakaoLoginInput: KakaoLoginInput!) {
    kakaoLogin(input: $kakaoLoginInput) {
      ok
      error
      token
    }
  }
`;

export const KakaoLogin: React.FC = () => {
  // const history = useHistory();
  const location = useLocation();
  const code = location.search.split("?code=")[1];

  const onMutationCompleted = (data: KakaoLoginMutation) => {
    console.log("onMutationCompleted");
    const {
      kakaoLogin: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token); // 인증된 토큰 브라우저에 저장. 웹사이트 재방문시, localstorage의 토큰으로 자동 로그인 가능.
      authTokenVar(token);
      isLoggedInVar(true); // apollo.ts에서 설정한 reactive variable둘의 값 업데이트.
    }
    // loggedInRouter에 redirect해주는 라우터 설정
    // history.push(surveyRoute.start);
    // window.location.reload(); // 디버그 목적: LoggedInRouter 내에서 제대로 된 컴포넌트가 렌더링되지 않음. 문제점: 캐쉬가 완전히 지워짐.
  };

  const [kakaoLoginMutation, { loading: loadingMutation }] = useMutation<
    KakaoLoginMutation,
    KakaoLoginMutationVariables
  >(KAKAO_LOGIN_MUTATION, { onCompleted: onMutationCompleted });

  const sendMutation = () => {
    console.log("sendMutation");
    if (!loadingMutation) {
      kakaoLoginMutation({
        variables: {
          kakaoLoginInput: { code },
        },
      });
    }
  };

  // eslint-disable-next-line
  useEffect(sendMutation, []);

  return (
    <main className="w-full h-screen bg-white">
      <Helmet>
        <title>Loading</title>
      </Helmet>
      <div className="w-full h-full flex items-center justify-center font-bold text-3xl">
        Loading...
      </div>
    </main>
  );
};
