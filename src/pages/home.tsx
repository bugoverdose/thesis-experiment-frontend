import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { localAuthRoute, oauthRoute } from "../routers/routes";

export const Home: React.FC = () => {
  return (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>환영합니다</title>
      </Helmet>
      <div className="text-2xl capsule-container-width">
        <h2 className="text-4xl text-center pb-8 mb-16 border-b-2 font-semibold">
          실험 안내
        </h2>
        <div className="border-2 border-gray-800 mb-5 p-3 rounded-md">
          <p className="mb-5">
            안녕하세요. 심리학과 졸업논문을 위해 연구를 진행하고 있는
            학부생입니다. 해당 실험에 관심을 가져주셔서 감사합니다.
          </p>
          <p className="mb-5">
            총 설문 시간은 3분 이내로 예상되며, 참여 도중 언제든지 중단하실 수
            있습니다.
          </p>
          <p className="mb-5">
            연구에서 수집된 자료는 익명성이 보장되며, 연구 종료 후 데이터베이스
            자체를 폐기처분할 계획입니다.
          </p>
          <p className="mb-5">
            마지막 문항까지 응답한 참여자들 중 1분에게 추첨을 통해 치킨
            기프티콘을 보내드릴 예정입니다.
          </p>
          <p className="mb-5">
            문의 사항이 있다면 이메일(bugod96@gmail.com)로 연락바랍니다.
          </p>

          <p>다시 한번 귀한 시간 내주셔서 감사드립니다.</p>
        </div>
        <div className="flex flex-col items-center">
          <span>연구에 참여하기 위해 계정을 생성해주시기 바랍니다.</span>
          <div className="flex">
            <Link
              to={localAuthRoute.createAccount}
              className="capsule-btn capsule-btn-hover"
            >
              아이디와 비밀번호 생성
            </Link>
            <a
              className="capsule-btn capsule-btn-hover"
              href={oauthRoute.kakaoLogin}
            >
              카카오톡 계정으로 시작
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
