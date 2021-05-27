import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { Home } from "../pages/home";
import { KakaoLogin } from "../pages/auth/kakao-login";
import { CreateLocalAccount } from "../pages/auth/create-local-account";
import { LocalLogin } from "../pages/auth/local-login";
import { commonRoute, localAuthRoute, oauthRoute } from "./routes";

const LocalAuthRoutes = [
  <Route key={1} path={localAuthRoute.createAccount} exact>
    <CreateLocalAccount />
  </Route>,
  <Route key={2} path={localAuthRoute.login} exact>
    <LocalLogin />
  </Route>,
];

export const LoggedOutRouter = () => (
  <Router>
    <Header />
    <Switch>
      <Route path={commonRoute.home} exact>
        <Home />
      </Route>
      {LocalAuthRoutes}
      <Route path={oauthRoute.kakaoRedirectURI}>
        <KakaoLogin />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </Router>
);
