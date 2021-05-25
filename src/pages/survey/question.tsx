import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { FormSubmitBtn } from "../../components/form-submit-btn";
import { PopUp } from "../../components/pop-up";
import {
  questionOption,
  questionText,
  totalQuestionNum,
} from "../../constants";
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
    formState: { isValid, errors },
  } = useForm<ISaveResponseForm>({
    mode: "onBlur",
    defaultValues: { response: questionOption[3] },
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
        <h2 className="text-4xl text-center pb-8 mb-20 border-b-2 font-semibold">
          <span>다음 문장에 동의하는 정도를 선택하여 주시오.</span>
        </h2>

        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex flex-col text-2xl"
        >
          <div className="relative w-full mb-10">
            <label
              htmlFor="response"
              className={`font-semibold ${
                errors?.response?.message && "text-red-600"
              }`}
            >
              <span>
                {
                  questionText[
                    `question${questionNum}` as keyof typeof questionText
                  ]
                }
              </span>
            </label>
            <select
              id="response"
              {...register("response", {
                required: true,
              })}
              name="response"
              className="capsule-input m-5"
            >
              {questionOption.map((response, index) => (
                <option key={index}>{response}</option>
              ))}
            </select>
          </div>

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