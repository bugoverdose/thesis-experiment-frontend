import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HeaderLoggedOut as Header } from "../components/header-logged-out";
import { NotFound } from "../pages/404";
import { Home } from "../pages/home";
import { CreateLocalAccount } from "../pages/local-auth/create-local-account";
import { LocalLogin } from "../pages/local-auth/local-login";
import { commonRoute, localAuthRoute } from "./routes";

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
      {/* <Route path={authRoute.githubToken}>
        <GithubLogin />
      </Route> */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </Router>
);
