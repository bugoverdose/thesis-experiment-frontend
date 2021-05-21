import { Helmet } from "react-helmet-async";

export const StartSurvey: React.FC = () => {
  return (
    <main className="w-full h-screen pt-40 pb-28 bg-gray-800 text-white">
      <Helmet>
        <title>설문 시작</title>
      </Helmet>
      <div className="text-8xl">StartSurvey!!</div>
    </main>
  );
};
