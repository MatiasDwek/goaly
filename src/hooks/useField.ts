import { useState } from "react";

type fieldType = "text" | "number";

export const useField = (type: fieldType) => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    props: {
      type,
      value,
      onChange,
    },
    value,
    reset,
  };
};
