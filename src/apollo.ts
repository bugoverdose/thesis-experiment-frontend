import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token)); // 새로고침될 때마다 매번 새로 isLoggedInVar 생성하여 해당 값 대입.
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/graphql" // 백엔드의 playground 주소. (프론트엔드와 포트 번호는 달라야 함)
      : "https://podcast-backend-bugod.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers, // 기존에 존재하는 다른 http headers도 그대로 사용하도록.
      "x-jwt": token || "", // x-jwt key로 header 설정.
      // 주의. token이 없는 경우에 대비 필요.
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink), // concat을 통해 복수의 link들을 설정. authLink & httpLink
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            // local only field명: isLoggedIn
            read() {
              return isLoggedInVar(); // 실행하는 방법으로 reactive variable 값 설정.
            }, // read 메서드: 해당 isLoggedIn 필드에 담기는 값을 return
          },
        },
      },
    },
  }),
});
