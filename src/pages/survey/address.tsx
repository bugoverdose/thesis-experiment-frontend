import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { FormSubmitBtn } from "../../components/form-submit-btn";
import { PopUp } from "../../components/pop-up";
import { AccountType } from "../../generated_api_types/globalTypes";
import {
  SaveAddressResponse,
  SaveAddressResponseVariables,
} from "../../generated_api_types/SaveAddressResponse";
import { SAVE_ADDRESS_RESPONSE_MUTATION } from "../../hooks/saveUserInfoMutations";
import { useLoggedInUser } from "../../hooks/useLoggedInUser-hook";
import { surveyRoute } from "../../routers/routes";

interface ISaveAddressResponseForm {
  response: string;
}

export const Address: React.FC = () => {
  const { data: loggedInUserData } = useLoggedInUser();
  const history = useHistory();
  const {
    getValues,
    handleSubmit,
    register,
    formState: { isValid, errors },
  } = useForm<ISaveAddressResponseForm>({
    mode: "onBlur",
    defaultValues: { response: "" },
  });

  const onMutationCompleted = (data: SaveAddressResponse) => {
    const {
      saveAddressResponse: { ok },
    } = data;
    if (
      ok &&
      loggedInUserData?.loggedInUser?.accountType === AccountType.Kakao
    ) {
      history.push(surveyRoute.end);
    } else if (
      ok &&
      loggedInUserData?.loggedInUser?.accountType === AccountType.Local
    ) {
      history.push(surveyRoute.local_screening);
    } else {
      togglePopupMode();
    }
  };

  const [
    saveAddressResponseMutation,
    { loading: loadingMutation, data: saveAddressResponseMutationResult },
  ] = useMutation<SaveAddressResponse, SaveAddressResponseVariables>(
    SAVE_ADDRESS_RESPONSE_MUTATION,
    { onCompleted: onMutationCompleted }
  );

  const onValidSubmit = () => {
    if (!loadingMutation) {
      const { response } = getValues();
      saveAddressResponseMutation({
        variables: {
          saveAddressResponseInput: { response },
        },
      });
    }
  };

  const [popupMode, setPopupMode] = useState(false);
  const togglePopupMode = () => setPopupMode(!popupMode);

  return (
    <main className="w-full h-screen py-28 bg-white">
      <Helmet>
        <title>연락처</title>
      </Helmet>
      <div
        className={`capsule-container-width text-gray-600 ${
          popupMode && "pointer-events-none"
        }`}
      >
        <h2 className="text-4xl text-center pb-8 mb-20 border-b-2 font-semibold">
          연락처를 기재해주시기 바랍니다.
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
              <span>기프티콘 수령 목적입니다. 선택사항입니다.</span>
            </label>
            <input
              id="response"
              className={`capsule-input mt-5 ${
                errors?.response?.message && "border-red-600"
              }`}
              {...register("response", {
                required: false,
              })}
              name="response"
              placeholder="ex) 010-1234-5678"
            />
          </div>

          <FormSubmitBtn
            canClick={isValid}
            loading={loadingMutation}
            mainText={"다음 문항"}
          />
        </form>
      </div>
      {saveAddressResponseMutationResult?.saveAddressResponse?.error &&
        popupMode && (
          <PopUp
            mainMessage={
              saveAddressResponseMutationResult?.saveAddressResponse.error
            }
            togglePopupMode={togglePopupMode}
          />
        )}
    </main>
  );
};
