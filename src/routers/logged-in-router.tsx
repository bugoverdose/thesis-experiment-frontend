import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HeaderLoggedIn as Header } from "../components/header-logged-in";
import { EndSurvey } from "../pages/survey/end-survey";
import { Question } from "../pages/survey/question";
import { StartSurvey } from "../pages/survey/start-survey";
import { surveyRoute } from "./routes";

export const LoggedInRouter = () => {
  // const { data, loading } = useLoggedInUser();
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={surveyRoute.start} exact>
          <StartSurvey />
        </Route>
        <Route path={surveyRoute.question()}>
          <Question />
        </Route>
        <Route path={surveyRoute.end} exact>
          <EndSurvey />
        </Route>
      </Switch>
    </Router>
  );
};
