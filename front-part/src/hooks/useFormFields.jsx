import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function ({ target: { name, value } }) {
      setValues({
        ...fields,
        [name]: value
      });
    }
  ];
}