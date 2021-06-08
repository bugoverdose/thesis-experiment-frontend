import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FormSubmitBtn } from "../../components/form-submit-btn";
import { PopUp } from "../../components/pop-up";
import {
  SaveLocalScreeningResponse,
  SaveLocalScreeningResponseVariables,
} from "../../generated_api_types/SaveLocalScreeningResponse";
import { SAVE_LOCAL_SCREENING_MUTATION } from "../../hooks/saveUserInfoMutations";
import { surveyRoute } from "../../routers/routes";

interface ISaveLocalScreeningResponseForm {
  response: string;
}

export const LocalScreening: React.FC = () => {
  const history = useHistory();
  const {
    getValues,
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<ISaveLocalScreeningResponseForm>({
    mode: "onBlur",
    defaultValues: { response: "" },
  });

  const onMutationCompleted = (data: SaveLocalScreeningResponse) => {
    const {
      saveLocalScreeningResponse: { ok },
    } = data;
    if (ok) {
      history.push(surveyRoute.end);
    } else {
      togglePopupMode();
    }
  };

  const [
    saveAddressResponseMutation,
    { loading: loadingMutation, data: saveAddressResponseMutationResult },
  ] = useMutation<
    SaveLocalScreeningResponse,
    SaveLocalScreeningResponseVariables
  >(SAVE_LOCAL_SCREENING_MUTATION, { onCompleted: onMutationCompleted });

  const onValidSubmit = () => {
    if (!loadingMutation) {
      const { response } = getValues();
      saveAddressResponseMutation({
        variables: {
          saveLocalScreeningResponseInput: { response },
        },
      });
    }
  };

  const [popupMode, setPopupMode] = useState(false);
  const togglePopupMode = () => setPopupMode(!popupMode);

  return (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>마지막 질문</title>
      </Helmet>
      <div
        className={`capsule-container-width text-gray-600 ${
          popupMode && "pointer-events-none"
        }`}
      >
        <h2 className="capsule-responsive-text">
          해당 연구에서 카카오 로그인을 사용하지 않은 이유는?
        </h2>
        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex flex-col text-2xl"
        >
          <div className="relative w-full mb-10">
            <label htmlFor="response" className="font-semibold">
              <span>선택사항입니다. 자유롭게 기재해주세요.</span>
            </label>{" "}
            <input
              id="response"
              className="capsule-input mt-5"
              {...register("response", { required: false })}
              name="response"
              placeholder="ex) 카카오톡 계정이 없습니다."
            />
          </div>
          <Link
            to={surveyRoute.address}
            className="py-4 mb-3 text-xl text-center focus:outline-none text-white transition-colors rounded-lg bg-gray-500 hover:bg-gray-300 hover:text-gray-700"
          >
            이전 문항
          </Link>
          <FormSubmitBtn
            canClick={isValid}
            loading={loadingMutation}
            mainText={"제출"}
          />
        </form>
      </div>
      {saveAddressResponseMutationResult?.saveLocalScreeningResponse?.error &&
        popupMode && (
          <PopUp
            mainMessage={
              saveAddressResponseMutationResult?.saveLocalScreeningResponse
                .error
            }
            togglePopupMode={togglePopupMode}
          />
        )}
    </main>
  );
};
