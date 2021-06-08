import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AccountType } from "../../generated_api_types/globalTypes";
import { useLoggedInUser } from "../../hooks/useLoggedInUser-hook";
import { surveyRoute } from "../../routers/routes";

export const StartSurvey: React.FC = () => {
  const { data, loading } = useLoggedInUser(); // loading 여부는 Router에서 처리

  return loading ? (
    <div></div>
  ) : (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>설문 시작</title>
      </Helmet>
      <div className="capsule-container-width flex flex-col items-center text-2xl">
        <p className="mb-5">
          본 실험은 소셜 로그인에 대한 사용자들의 인식을 연구하고자 합니다.
        </p>
        <p className="mb-5">
          귀하는{" "}
          <strong>
            {data?.loggedInUser?.accountType === AccountType.Kakao
              ? "카카오톡을 통한 소셜 로그인 방법"
              : "사이트에 직접 계정을 생성하는 방법"}
          </strong>
          을 선택하셨습니다.
        </p>
        <p className="mb-5">다음으로 간단한 설문에 응답하여 주시기 바랍니다.</p>
        <Link to={surveyRoute.gender} className="capsule-btn capsule-btn-hover">
          설문 시작
        </Link>
      </div>
    </main>
  );
};
