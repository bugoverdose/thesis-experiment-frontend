import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { commonRoute } from "../../routers/routes";

export const EndSurvey: React.FC = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN); // 인증된 토큰 브라우저에 저장. 웹사이트 재방문시, localstorage의 토큰으로 자동 로그인 가능.
    authTokenVar(null);
    isLoggedInVar(false);
    history.push(commonRoute.home);
  };

  return (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>감사합니다</title>
      </Helmet>
      <div className="flex flex-col capsule-container-width text-3xl font-semibold text-center">
        <div className="mb-5">실험에 참여해주셔서 감사합니다!</div>

        <div onClick={logout} className="capsule-btn capsule-btn-hover">
          처음으로 돌아가기
        </div>
      </div>
    </main>
  );
};
