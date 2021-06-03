import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { FormSubmitBtn } from "../../components/form-submit-btn";
import { PopUp } from "../../components/pop-up";
import {
  SaveUserInfoResponse,
  SaveUserInfoResponseVariables,
} from "../../generated_api_types/SaveUserInfoResponse";
import { surveyRoute } from "../../routers/routes";
import { ageOption } from "../../constants";
import { SAVE_USER_INFO_RESPONSE_MUTATION } from "../../hooks/saveUserInfoMutations";

interface ISaveAgeResponseForm {
  response: number;
}

export const Age: React.FC = () => {
  const history = useHistory();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ISaveAgeResponseForm>({
    mode: "onBlur",
    defaultValues: { response: 20 },
  });

  const onMutationCompleted = (data: SaveUserInfoResponse) => {
    const {
      saveUserInfoResponse: { ok },
    } = data;
    if (ok) {
      history.push(surveyRoute.question(1));
    } else {
      togglePopupMode();
    }
  };

  const [
    saveUserInfoResponseMutation,
    { loading: loadingMutation, data: saveUserInfoResponseMutationResult },
  ] = useMutation<SaveUserInfoResponse, SaveUserInfoResponseVariables>(
    SAVE_USER_INFO_RESPONSE_MUTATION,
    { onCompleted: onMutationCompleted }
  );

  const onValidSubmit = () => {
    if (!loadingMutation) {
      const { response } = getValues();
      saveUserInfoResponseMutation({
        variables: {
          saveUserInfoResponseInput: { target: "age", response: +response },
        },
      });
    }
  };
  const [popupMode, setPopupMode] = useState(false);
  const togglePopupMode = () => setPopupMode(!popupMode);

  return (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>연령</title>
      </Helmet>
      <div
        className={`capsule-container-width text-gray-600 ${
          popupMode && "pointer-events-none"
        }`}
      >
        <h2 className="text-4xl text-center pb-8 mb-20 border-b-2 font-semibold">
          귀하의 연령은 무엇입니까?
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
              <span>만 나이로 선택해주시기 바랍니다.</span>
            </label>
            <select
              id="response"
              {...register("response", {
                required: true,
              })}
              name="response"
              className="capsule-input mt-5"
            >
              {ageOption.map((response, index) => (
                <option key={index}>{response}</option>
              ))}
            </select>
          </div>
          <FormSubmitBtn
            canClick={isValid}
            loading={loadingMutation}
            mainText={"다음 문항"}
          />
        </form>
      </div>
      {saveUserInfoResponseMutationResult?.saveUserInfoResponse?.error &&
        popupMode && (
          <PopUp
            mainMessage={
              saveUserInfoResponseMutationResult?.saveUserInfoResponse.error
            }
            togglePopupMode={togglePopupMode}
          />
        )}
    </main>
  );
};
