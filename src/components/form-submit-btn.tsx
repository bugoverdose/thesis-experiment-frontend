import React from "react";

interface FormSubmitBtnProps {
  canClick: boolean;
  loading: boolean;
  mainText: string; // 로딩중이지 않을 때 보여줄 버튼 문구.
}

export const FormSubmitBtn: React.FC<FormSubmitBtnProps> = ({
  canClick,
  loading,
  mainText,
}) => {
  return (
    <button
      // role="button" // 이미 디폴트로 적용되어있으므로 별도로 정의 불필요.
      className={`py-4 text-xl focus:outline-none text-white transition-colors rounded-lg ${
        canClick
          ? "bg-gray-900 hover:bg-gray-700"
          : "pointer-events-none bg-gray-300"
      }`}
    >
      {loading ? "Loading..." : mainText}
    </button>
  );
};
