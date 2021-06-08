export const SESSION_STORAGE_TOKEN = "authentication-token";

// export const ageOption = Array.from(Array(100), (_, idx) => idx + 1);
// export const questionOption = [
//   "1점 - 전혀 동의하지 않는다",
//   "2점 - 그다지 동의하지 않는다",
//   "3점 - 별로 동의하지 않는다",
//   "4점 - 보통이다",
//   "5점 - 약간 동의한다.",
//   "6점 - 상당히 동의한다",
//   "7점 - 매우 동의한다",
// ];

export const totalQuestionNum = 16;

export enum questionText {
  // 편의성: 회원가입 과정
  question1 = "내가 소셜로그인 방식을 선호하는 이유는 간편하게 회원가입을 할 수 있기 때문이다.",
  question2 = "내가 소셜로그인 방식을 선호하는 이유는 회원가입을 할 때 들어가는 시간이 아깝기 때문이다.",

  // 편의성: 로그인 및 계정 관리
  question3 = "더욱 간편하게 사이트에 로그인할 수 있기 때문에 소셜로그인 방식을 선호한다.",
  question4 = "나는 기본적으로 사이트마다 서로 다른 아이디와 비밀번호 조합으로 다양하게 계정을 생성하는 편이다.",
  question5 = "나는 하나의 SNS 계정으로 다양한 사이트에 로그인할 수 있기 때문에 소셜로그인을 선호한다.",

  // 친숙성 및 브랜드 인지도
  question6 = "이미 나는 그동안 소셜로그인을 많이 사용해봤기 때문에 소셜로그인 방식을 선호한다.",
  question7 = "카카오톡, 인스타그램과 같은 소셜 플랫폼들이 익숙하기 때문에 해당 서비스를 통한 소셜로그인을 선호한다.",

  // 보안
  question8 = "내가 소셜로그인 방식을 선호하지 않는 이유는 보안에 대한 우려 때문이다.",
  question9 = "소셜로그인을 사용하면 카카오톡, 인스타그램과 같은 기업들이 나의 개인정보를 안전하게 지켜줄 것 같다.",
  question10 = "내가 소셜로그인 방식을 선호하지 않는 이유는 내 계정이 해킹 당할 가능성이 높아질 것 같기 때문이다.",

  // 개인정보 보호
  question11 = "소셜로그인을 사용하면 내가 모르는 방식으로 나의 개인정보가 활용될 위험이 증가할 것 같다.",
  question12 = "소셜로그인을 사용하면 나의 개인정보가 외부로 유출될 가능성이 증가할 것 같다.",
  question13 = "소셜로그인을 사용하면 나의 생일, 연령, 이메일 주소 등의 개인정보가 자동으로 해당 업체에 제공될 것 같다.",
  question14 = "내가 소셜로그인 방식을 선호하지 않는 이유는 온라인에서의 익명성을 유지하고 싶기 때문이다.",

  // 개인혁신성 및 기술에 대한 태도
  question15 = "내가 소셜로그인 사용을 꺼리는 이유는 소셜로그인의 원리를 잘 모르기 때문이다.",
  question16 = "소셜로그인은 새로 등장한 최신기술이기 때문에 더욱 신뢰할 수 있다.",
}
