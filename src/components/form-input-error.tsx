import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IFormInputErrorProps {
  errorMessage: string;
}

export const FormInputError: React.FC<IFormInputErrorProps> = ({
  errorMessage,
}) => (
  <div
    className="absolute right-1 bottom-0 z-10 p-1 font-semibold text-red-700 text-lg lg:text-2xl"
    role="alert"
  >
    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
    {errorMessage}
  </div>
);
