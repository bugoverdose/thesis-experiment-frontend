import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { FormInputError } from "../../components/form-input-error";
import { FormSubmitBtn } from "../../components/form-submit-btn";
import { PopUp } from "../../components/pop-up";
import {
  CreateLocalAccountMutation,
  CreateLocalAccountMutationVariables,
} from "../../generated_api_types/CreateLocalAccountMutation";
import { localAuthRoute } from "../../routers/routes";

export const CREATE_LOCAL_ACCOUNT_MUTATION = gql`
  mutation CreateLocalAccountMutation(
    $createLocalAccountInput: CreateLocalAccountInput!
  ) {
    createLocalAccount(input: $createLocalAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateLocalAccountForm {
  localId: string;
  password: string;
}

export const CreateLocalAccount = () => {
  const history = useHistory();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ICreateLocalAccountForm>({
    mode: "onBlur",
  });

  const onMutationCompleted = (data: CreateLocalAccountMutation) => {
    const {
      createLocalAccount: { ok },
    } = data;

    if (ok) {
      alert("계정이 생성되었습니다! 로그인하세요!");
      history.push(localAuthRoute.login);
    } else {
      togglePopupMode();
    } //  input 내용 변경 안하고 그대로 submit하는 경우, Query면 cache에서 그대로 읽어서 실행되지 않음 / Mutation이면 제대로 재실행됨.
  };

  const [
    sendCreateLocalAccountMutation,
    { loading: loadingMutation, data: createLocalAccountMutationResult },
  ] = useMutation<
    CreateLocalAccountMutation,
    CreateLocalAccountMutationVariables
  >(CREATE_LOCAL_ACCOUNT_MUTATION, { onCompleted: onMutationCompleted });

  const onValidSubmit = () => {
    if (!loadingMutation) {
      const { localId, password } = getValues();
      sendCreateLocalAccountMutation({
        variables: {
          createLocalAccountInput: { localId, password },
        },
      });
    }
  };

  const [popupMode, setPopupMode] = useState(false);
  const togglePopupMode = () => setPopupMode(!popupMode);

  return (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>회원가입</title>
      </Helmet>

      <div
        className={`capsule-container-width text-gray-600 ${
          popupMode && "pointer-events-none"
        }`}
      >
        <h2 className="text-4xl text-center pb-8 mb-20 border-b-2 font-semibold">
          계정을 생성해주세요
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
            mainText={"Submit"}
          />
        </form>
        <span className="font-semibold flex justify-center items-center">
          이미 계정이 있으신가요?
          <Link
            to={localAuthRoute.login}
            className="border-b-2 border-gray-800 ml-2"
          >
            로그인하기
          </Link>
        </span>
      </div>

      {createLocalAccountMutationResult?.createLocalAccount?.error &&
        popupMode && (
          <PopUp
            mainMessage="Failed To Create Account"
            subMessage={
              createLocalAccountMutationResult?.createLocalAccount.error
            }
            togglePopupMode={togglePopupMode}
          />
        )}
    </main>
  );
};
