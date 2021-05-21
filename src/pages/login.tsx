import { Helmet } from "react-helmet-async";
// import { authRoute } from "../routers/routes";

export const Login: React.FC = () => {
  return (
    <main className="w-full h-screen pt-40 pb-28 bg-gray-800 text-white">
      <Helmet>
        <title>Login | Podcast</title>
      </Helmet>
      {/* <a className="black text-8xl" href={authRoute.githubLogin}>
        Github Login!!!
      </a> */}
    </main>
  );
};
