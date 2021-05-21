import { Helmet } from "react-helmet-async";

export const Question: React.FC = () => {
  return (
    <main className="w-full h-screen pt-40 pb-28 bg-gray-800 text-white">
      <Helmet>
        <title>설문 문항 1번</title>
      </Helmet>
      <div className="text-8xl">Question!</div>
    </main>
  );
};
