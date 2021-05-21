module.exports = {
  client: {
    includes: ["./src/**/*.tsx"], // src 폴더 내부의 모든 폴더들의 .tsx 파일들 찾기. 폴더 내부의 폴더들도 다 찾음.
    tagName: "gql", // gql`` 형식의 graphql문들을 대상으로 함.
    service: {
      name: "uber-eats-backend", // 이름은 자유 지정.
      url: "http://localhost:5000/graphql", // 백엔드 graphql url
    },
  }, // includes에 지정된 파일들에서 사용된 gql``에 대해 관련 TS definition을 제공. // 즉, 모든 스키마를 전부 다 import해오지 않음. 사용하는 것들만 가져옴.
};
