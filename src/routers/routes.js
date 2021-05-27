export const oauthRoute = {
  kakaoLogin: `https:/kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`, // callback UrL에 code값 받아오기.
  kakaoRedirectURI: "/oauth",
};

export const commonRoute = {
  home: "/",
};

export const localAuthRoute = {
  createAccount: "/create-account",
  login: "/login",
};

export const surveyRoute = {
  start: "/",
  gender: "/gender",
  age: "/age",
  question: (num) => (num ? `/question/${num}` : "/question/:num"),
  address: "/address",
  local_screening: "/local-screening",
  end: "/submit",
};
