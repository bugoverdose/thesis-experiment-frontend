import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router";
import { surveyRoute } from "../../routers/routes";

export const LoadingLogin: React.FC = () => {
  const history = useHistory();
  history.push(surveyRoute.start);
  return (
    <main className="w-full h-screen pt-40 pb-28 bg-gray-800 text-white">
      <Helmet>
        <title>Loading | Podcast</title>
      </Helmet>
    </main>
  );
};
