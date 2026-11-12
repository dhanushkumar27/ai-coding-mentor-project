import { useContext } from "react";
import CodeInputContext from "./CodeInputContext";

const useCodeInput = () => {
  const context = useContext(CodeInputContext);

  if (!context) {
    throw new Error(
      "useCodeInput must be used inside CodeInputProvider"
    );
  }

  return context;
};

export default useCodeInput;