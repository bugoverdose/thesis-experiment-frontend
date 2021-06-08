import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { FormInputError } from "../../components/form-input-error";
import { FormSubmitBtn } from "../../components/form-submit-btn";
import { PopUp } from "../../components/pop-up";
import { SESSION_STORAGE_TOKEN } from "../../constants";
import {
  LocalLoginMutation,
  LocalLoginMutationVariables,
} from "../../generated_api_types/LocalLoginMutation";
import { localAuthRoute } from "../../routers/routes";

export const LOCAL_LOGIN_MUTATION = gql`
  mutation LocalLoginMutation($localLoginInput: LocalLoginInput!) {
    localLogin(input: $localLoginInput) {
      ok
      error
      token
    }
  }
`;

interface ILocalLoginForm {
  localId: string;
  password: string;
}

export const LocalLogin = () => {
  // const history = useHistory();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILocalLoginForm>({
    mode: "onBlur",
  });

  const onMutationCompleted = (data: LocalLoginMutation) => {
    const {
      localLogin: { ok, token },
    } = data;
    if (ok && token) {
      sessionStorage.setItem(SESSION_STORAGE_TOKEN, token); // 인증된 토큰 브라우저에 저장. 웹사이트 재방문시, SESSION_STORAGE의 토큰으로 자동 로그인 가능.
      authTokenVar(token);
      isLoggedInVar(true); // apollo.ts에서 설정한 reactive variable둘의 값 업데이트.
      // history.push(surveyRoute.start);
      window.location.reload();
    } else {
      togglePopupMode(); // mutation 사용해야 하는 원인.
    } //  input 내용 변경 안하고 그대로 submit하는 경우, Query면 cache에서 그대로 읽어서 실행되지 않음 / Mutation이면 제대로 재실행됨.
  };

  const [
    LocalLoginMutation,
    { loading: loadingMutation, data: loginMutationResult },
  ] = useMutation<LocalLoginMutation, LocalLoginMutationVariables>(
    LOCAL_LOGIN_MUTATION,
    {
      onCompleted: onMutationCompleted,
    }
  );

  const onValidSubmit = (data: LocalLoginMutation) => {
    if (!loadingMutation) {
      const { localId, password } = getValues();
      LocalLoginMutation({
        variables: { localLoginInput: { localId, password } },
      });
    }
  };

  const [popupMode, setPopupMode] = useState(false);
  const togglePopupMode = () => setPopupMode(!popupMode);

  return (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>로그인</title>
      </Helmet>

      <div
        className={`capsule-container-width text-gray-600 ${
          popupMode && "pointer-events-none"
        }`}
      >
        <h2 className="capsule-responsive-text">로그인해주세요</h2>

        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex flex-col mb-5 capsule-responsive-subtext"
        >
          <div className="relative w-full">
            <label
              htmlFor="localId"
              className={`font-semibold ${errors?.localId && "text-red-600"}`}
            >
              아이디
              <span className="text-red-600 italic">
                {errors?.localId?.type === "minLength" &&
                  " - 5글자 이상이어야 합니다."}
                {errors?.localId?.type === "maxLength" &&
                  " - 15글자 이하여야 합니다."}
              </span>
            </label>
            <input
              id="localId"
              className={`capsule-input ${errors?.localId && "border-red-600"}`}
              {...register("localId", {
                required: "아이디는 필수사항입니다",
                minLength: 5,
                maxLength: 15,
              })}
              name="localId"
              type="localId"
            />
            {errors?.localId?.message && (
              <FormInputError errorMessage={errors?.localId.message} />
            )}
          </div>

          <div className="relative w-full my-5">
            <label
              htmlFor="password"
              className={`font-semibold ${errors?.password && "text-red-600"}`}
            >
              비밀번호
              <span className="text-red-600 italic">
                {errors?.password?.type === "minLength" &&
                  " - 8글자 이상이어야 합니다."}
                {errors?.password?.type === "maxLength" &&
                  " - 20글자 이하여야 합니다."}
              </span>
            </label>
            <input
              id="password"
              className={`capsule-input ${
                errors?.password && "border-red-600"
              }`}
              {...register("password", {
                required: "비밀번호는 필수사항입니다",
                minLength: 8,
                maxLength: 20,
              })}
              name="password"
              type="password"
            />
            {errors?.password?.message && (
              <FormInputError errorMessage={errors?.password.message} />
            )}
          </div>

          <FormSubmitBtn
            canClick={isValid}
            loading={loadingMutation}
            mainText={"로그인"}
          />
        </form>
        <span className="font-semibold flex justify-center items-center">
          계정이 없으신가요?
          <Link
            to={localAuthRoute.createAccount}
            className="border-b-2 border-gray-800 ml-2"
          >
            회원가입하기
          </Link>
        </span>
      </div>

      {loginMutationResult?.localLogin.error && popupMode && (
        <PopUp
          mainMessage="Failed To Login"
          subMessage={loginMutationResult?.localLogin.error}
          togglePopupMode={togglePopupMode}
        />
      )}
    </main>
  );
};
