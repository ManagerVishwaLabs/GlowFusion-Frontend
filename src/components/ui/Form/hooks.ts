import * as React from "react";
import { FormContext } from "./context";

export function useFormContext() {
  const context = React.useContext(FormContext);

  if (!context) {
    throw new Error("Must be used inside <Form>");
  }

  return context;
}

export function useField(name: string) {
  const { values, errors, touched, setValue, setTouched, validateField } =
    useFormContext();

  return {
    value: values[name] ?? "",
    error: errors[name],
    touched: touched[name] ?? false,

    setValue: (value: unknown) => setValue(name, value),

    onBlur: () => {
      setTouched(name, true);
      validateField(name);
    },
  };
}
