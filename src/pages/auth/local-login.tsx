import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { FormInputError } from "../../components/form-input-error";
import { FormSubmitBtn } from "../../components/form-submit-btn";
import { PopUp } from "../../components/pop-up";
import { LOCALSTORAGE_TOKEN } from "../../constants";
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
      localStorage.setItem(LOCALSTORAGE_TOKEN, token); // 인증된 토큰 브라우저에 저장. 웹사이트 재방문시, localstorage의 토큰으로 자동 로그인 가능.
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
        <h2 className="text-4xl text-center pb-8 mb-20 border-b-2 font-semibold">
          로그인
        </h2>

        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex flex-col mb-5 text-2xl"
        >
          <div className="relative w-full">
            <label
              htmlFor="localId"
              className={`font-semibold ${
                errors?.localId?.message && "text-red-600"
              }`}
            >
              ID <span className="text-red-600">*</span>
            </label>
            <input
              id="localId"
              className={`capsule-input ${
                errors?.localId?.message && "border-red-600"
              }`}
              {...register("localId", {
                required: "ID is Required",
                minLength: 5,
                maxLength: 15,
              })}
              name="localId"
              type="localId"
            />
            {errors?.localId?.message && (
              <FormInputError errorMessage={errors?.localId.message} />
            )}
            {errors?.localId?.type === "minLength" && (
              <FormInputError errorMessage={"5글자 이상이어야 합니다."} />
            )}
            {errors?.localId?.type === "maxLength" && (
              <FormInputError errorMessage={"15글자 이하여야 합니다."} />
            )}
          </div>

          <div className="relative w-full my-5">
            <label
              htmlFor="password"
              className={`font-semibold ${
                errors?.password?.message && "text-red-600"
              }`}
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              className={`capsule-input ${
                errors?.password?.message && "border-red-600"
              }`}
              {...register("password", {
                required: "Password is Required",
                minLength: 8,
                maxLength: 20,
              })}
              name="password"
              type="password"
            />
            {errors?.password?.message && (
              <FormInputError errorMessage={errors?.password.message} />
            )}
            {errors?.password?.type === "minLength" && (
              <FormInputError errorMessage={"8글자 이상이어야 합니다."} />
            )}
            {errors?.password?.type === "maxLength" && (
              <FormInputError errorMessage={"20글자 이하여야 합니다."} />
            )}
          </div>

          <FormSubmitBtn
            canClick={isValid}
            loading={loadingMutation}
            mainText={"Log In"}
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
