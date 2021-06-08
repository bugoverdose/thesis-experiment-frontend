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
import { SAVE_USER_INFO_RESPONSE_MUTATION } from "../../hooks/saveUserInfoMutations";
import { RadioInput } from "../../components/radio-input";

interface ISaveGenderResponseForm {
  response: string;
}

export const Gender: React.FC = () => {
  const history = useHistory();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<ISaveGenderResponseForm>({
    mode: "onChange",
  });

  const onMutationCompleted = (data: SaveUserInfoResponse) => {
    const {
      saveUserInfoResponse: { ok },
    } = data;
    if (ok) {
      history.push(surveyRoute.age);
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
      let responseNum;
      if (response === "남성") {
        responseNum = 0;
      } else if (response === "여성") {
        responseNum = 1;
      } else {
        responseNum = 2;
      }
      saveUserInfoResponseMutation({
        variables: {
          saveUserInfoResponseInput: {
            target: "gender",
            response: responseNum,
          },
        },
      });
    }
  };

  const [popupMode, setPopupMode] = useState(false);
  const togglePopupMode = () => setPopupMode(!popupMode);

  return (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>성별</title>
      </Helmet>
      <div
        className={`capsule-container-width text-gray-600 ${
          popupMode && "pointer-events-none"
        }`}
      >
        <h2 className="capsule-responsive-text">귀하의 성별은 무엇입니까?</h2>
        <form
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex flex-col text-2xl"
        >
          <div className="flex flex-col mb-10">
            <RadioInput
              register={register}
              value={"남성"}
              text={"남성"}
              labelCss="mb-3"
            />
            <RadioInput
              register={register}
              value={"여성"}
              text={"여성"}
              labelCss="mb-3"
            />
            <RadioInput
              register={register}
              value={"해당없음"}
              text={"해당없음"}
              labelCss="mb-3"
            />
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
