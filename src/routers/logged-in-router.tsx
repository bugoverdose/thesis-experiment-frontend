import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HeaderLoggedIn as Header } from "../components/header-logged-in";
import { useLoggedInUser } from "../hooks/useLoggedInUser-hook";
import { NotFound } from "../pages/404";
import { LoadingLogin } from "../pages/auth/loading-login";
import { Address } from "../pages/survey/address";
import { Age } from "../pages/survey/age";
import { EndSurvey } from "../pages/survey/end-survey";
import { Gender } from "../pages/survey/gender";
import { LocalScreening } from "../pages/survey/local-screening";
import { Question } from "../pages/survey/question";
import { StartSurvey } from "../pages/survey/start-survey";
import { localAuthRoute, oauthRoute, surveyRoute } from "./routes";

export const LoggedInRouter = () => {
  const { loading } = useLoggedInUser();
  return (
    <Router>
      <Header />
      {loading && <></>}
      {!loading && (
        <Switch>
          <Route path={surveyRoute.start} exact>
            <StartSurvey />
          </Route>
          <Route path={surveyRoute.gender} exact>
            <Gender />
          </Route>
          <Route path={surveyRoute.age} exact>
            <Age />
          </Route>
          <Route path={surveyRoute.question()}>
            <Question />
          </Route>
          <Route path={surveyRoute.address} exact>
            <Address />
          </Route>
          <Route path={surveyRoute.local_screening} exact>
            <LocalScreening />
          </Route>
          <Route path={surveyRoute.end} exact>
            <EndSurvey />
          </Route>
          <Route path={localAuthRoute.login}>
            <LoadingLogin />
          </Route>
          <Route path={oauthRoute.kakaoRedirectURI}>
            <LoadingLogin />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
    </Router>
  );
};
