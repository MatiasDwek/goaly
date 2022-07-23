import { useState } from "react";

type FieldType = "text" | "number";

export const useField = (type: FieldType) => {
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
