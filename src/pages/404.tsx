import { Helmet } from "react-helmet-async";

export const NotFound: React.FC = () => (
  <main className="w-full h-screen bg-white">
    <Helmet>
      <title>Not Found | havom</title>
    </Helmet>
    <div className="w-full h-full flex items-center justify-center font-bold text-3xl">
      404 Page Not Found
    </div>
  </main>
);
