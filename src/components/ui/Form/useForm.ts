import * as React from "react";
import type { ValidationRule, FormErrors, FormTouched } from "./types";

export function useForm(initialValues: Record<string, unknown> = {}) {
  const [values, setValues] = React.useState(initialValues);

  const [errors, setErrors] = React.useState<FormErrors>({});

  const [touched, setTouched] = React.useState<FormTouched>({});

  const validations = React.useRef<Record<string, ValidationRule | undefined>>(
    {},
  );

  const setValue = (name: string, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setFieldTouched = (name: string, value: boolean) => {
    setTouched((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerValidation = (name: string, rule?: ValidationRule) => {
    validations.current[name] = rule;
  };

  const validateField = (name: string) => {
    const rule = validations.current[name];

    if (!rule) return true;

    const error = rule(values[name]);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return !error;
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched: setFieldTouched,
    registerValidation,
    validateField,
  };
}

export type UseFormReturn = ReturnType<typeof useForm>;
