import React from "react";
import {
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

interface IPopUpProps {
  mainMessage: string;
  subMessage?: string;
  redirectRoute?: string;
  togglePopupMode?: any; // 함수여야 함.
}

export const PopUp: React.FC<IPopUpProps> = ({
  mainMessage,
  subMessage,
  redirectRoute,
  togglePopupMode,
}) => {
  const history = useHistory();
  const onClickExit = () => {
    togglePopupMode(); // 비교) window.location.reload(false); // VanillaJS way to refresh page. cache 무시하고 서버에 모든 리소스 요청.
  };
  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full h-screen bg-gray-800 opacity-80"></div>
      <div
        role="alert"
        className="fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center"
      >
        <div className="p-8 rounded-md bg-white opacity-100 relative flex text-gray-600">
          <div>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="mr-6 text-5xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-xl">{mainMessage}</h2>
            {subMessage && <h3>{subMessage}</h3>}
          </div>
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-3 right-3"
            onClick={
              redirectRoute ? () => history.push(redirectRoute) : onClickExit
            }
          />
        </div>
      </div>
    </>
  );
};
