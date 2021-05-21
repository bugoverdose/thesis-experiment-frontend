import React from "react";
import { useHistory } from "react-router-dom";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { commonRoute } from "../routers/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export const HeaderLoggedIn: React.FC = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN); // 인증된 토큰 브라우저에 저장. 웹사이트 재방문시, localstorage의 토큰으로 자동 로그인 가능.
    authTokenVar(null);
    isLoggedInVar(false);
    history.push(commonRoute.home);
  };
  return (
    <header className="w-full py-7 bg-gray-900 text-gray-100 shadow-lg fixed">
      <div className="flex capsule-container-width">
        <FontAwesomeIcon
          icon={faSignOutAlt}
          onClick={logout}
          className="text-xl mr-3 cursor-pointer hover:text-gray-300"
        />
      </div>
    </header>
  );
};
