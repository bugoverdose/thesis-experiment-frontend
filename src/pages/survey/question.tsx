import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { FormSubmitBtn } from "../../components/form-submit-btn";
import { PopUp } from "../../components/pop-up";
import { RadioInput } from "../../components/radio-input";
import { questionText, totalQuestionNum } from "../../constants";
import {
  SaveResponseMutation,
  SaveResponseMutationVariables,
} from "../../generated_api_types/SaveResponseMutation";
import { surveyRoute } from "../../routers/routes";

export const SAVE_RESPONSE_MUTATION = gql`
  mutation SaveResponseMutation($saveResponseInput: SaveResponseInput!) {
    saveResponse(input: $saveResponseInput) {
      error
      ok
    }
  }
`;

interface ISaveResponseForm {
  response: string;
}

export const Question: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const questionNum = location.pathname.split("/question/")[1];
  let loading = true;
  if (+questionNum < 1 || +questionNum > totalQuestionNum) {
    history.push(surveyRoute.start);
  } else {
    loading = false;
  }

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<ISaveResponseForm>({
    mode: "onChange",
  });

  const onMutationCompleted = (data: SaveResponseMutation) => {
    const {
      saveResponse: { ok },
    } = data;
    if (ok && +questionNum < totalQuestionNum) {
      history.push(surveyRoute.question(+questionNum + 1));
    } else if (ok && +questionNum === totalQuestionNum) {
      history.push(surveyRoute.address);
    } else {
      togglePopupMode();
    }
  };

  const [
    saveResponseMutation,
    { loading: loadingMutation, data: saveResponseMutationResult },
  ] = useMutation<SaveResponseMutation, SaveResponseMutationVariables>(
    SAVE_RESPONSE_MUTATION,
    { onCompleted: onMutationCompleted }
  );

  const onValidSubmit = () => {
    if (!loadingMutation) {
      const { response } = getValues();
      const score = +response.split("점")[0];
      console.log(score);
      saveResponseMutation({
        variables: {
          saveResponseInput: { questionNum: +questionNum, response: score },
        },
      });
    }
  };

  const [popupMode, setPopupMode] = useState(false);
  const togglePopupMode = () => setPopupMode(!popupMode);

  return loading ? (
    <div></div>
  ) : (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>{`문항 ${questionNum}번`}</title>
      </Helmet>

      <div
        className={`capsule-container-width text-gray-600 ${
          popupMode && "pointer-events-none"
        }`}
      >
        <h2 className="capsule-responsive-text">
          <span>다음 문장에 동의하는 정도를 선택하여 주시오.</span>
        </h2>
        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex flex-col text-2xl"
        >
          <div className="relative w-full mb-10">
            {/* <label
              htmlFor="response"
              className="font-semibold"
            > */}
            <span>
              {
                questionText[
                  `question${questionNum}` as keyof typeof questionText
                ]
              }
            </span>
            {/* </label> */}

            <div className="flex justify-center items-center mt-5">
              <div className="text-lg font-bold sm:text-2xl sm:font-medium mr-3">
                동의
              </div>
              <div className="flex justify-center items-center">
                <RadioInput
                  register={register}
                  value={7}
                  inputCss="h-6 w-6 sm:h-10 sm:w-10"
                />
                <RadioInput
                  register={register}
                  value={6}
                  inputCss="h-6 w-6 sm:h-9 sm:w-9"
                />
                <RadioInput
                  register={register}
                  value={5}
                  inputCss="h-6 w-6 sm:h-8 sm:w-8"
                />
                <RadioInput
                  register={register}
                  value={4}
                  inputCss="h-6 w-6 sm:h-7 sm:w-7"
                />
                <RadioInput
                  register={register}
                  value={3}
                  inputCss="h-6 w-6 sm:h-8 sm:w-8"
                />
                <RadioInput
                  register={register}
                  value={2}
                  inputCss="h-6 w-6 sm:h-9 sm:w-9"
                />
                <RadioInput
                  register={register}
                  value={1}
                  inputCss="h-6 w-6 sm:h-10 sm:w-10"
                />
              </div>
              <div className="text-lg font-bold sm:text-2xl sm:font-medium">
                비동의
              </div>
            </div>
          </div>
          {/* <select
              id="response"
              {...register("response", { required: true })}
              name="response"
              className="capsule-input mt-5"
            >
              {questionOption.map((response, index) => (
                <option key={index}>{response}</option>
              ))}
            </select> */}
          <Link
            to={
              +questionNum === 1
                ? surveyRoute.age
                : surveyRoute.question(+questionNum - 1)
            }
            className="py-4 mb-3 text-xl text-center focus:outline-none text-white transition-colors rounded-lg bg-gray-500 hover:bg-gray-300 hover:text-gray-700"
          >
            이전 문항
          </Link>

          <FormSubmitBtn
            canClick={isValid}
            loading={loadingMutation}
            mainText={`다음 문항 (${questionNum}/${totalQuestionNum})`}
          />
        </form>
      </div>

      {saveResponseMutationResult?.saveResponse?.error && popupMode && (
        <PopUp
          mainMessage={saveResponseMutationResult?.saveResponse.error}
          togglePopupMode={togglePopupMode}
        />
      )}
    </main>
  );
};
