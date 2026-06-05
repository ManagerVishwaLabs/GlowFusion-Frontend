export type ValidationRule = (value: unknown) => string | null;

export type FormValues = Record<string, unknown>;

export type FormErrors = Record<string, string | null>;

export type FormTouched = Record<string, boolean>;

export interface FormContextType {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;

  setValue: (name: string, value: unknown) => void;

  setTouched: (name: string, touched: boolean) => void;

  registerValidation: (name: string, rule?: ValidationRule) => void;

  validateField: (name: string) => boolean;
}
