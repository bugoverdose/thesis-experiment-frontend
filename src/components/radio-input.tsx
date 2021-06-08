import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IRadioInputProps {
  register: UseFormRegister<any>;
  text?: string;
  labelCss?: string;
  inputCss?: string;
  value: string | number;
}

export const RadioInput: React.FC<IRadioInputProps> = ({
  register,
  text,
  labelCss,
  inputCss,
  value,
}) => (
  <label className={labelCss}>
    <input
      type="radio"
      {...register("response", { required: true })}
      className={`capsule-radio ${inputCss}`}
      value={value}
    />
    {text}
  </label>
);
