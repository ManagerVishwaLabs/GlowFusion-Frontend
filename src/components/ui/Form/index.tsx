import * as React from "react";
import styles from "./Form.module.css";

import { FormContext, FormFieldContext } from "./context";

import { useField } from "./hooks";
import { cn } from "./utils";

import type { ValidationRule } from "./types";

import type { UseFormReturn } from "./useForm";

/* ---------------------------------- */
/* Form Provider                      */
/* ---------------------------------- */

interface FormProps {
  children: React.ReactNode;
  form: UseFormReturn;
}

function Form({ children, form }: FormProps) {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
}

/* ---------------------------------- */
/* Form Field                         */
/* ---------------------------------- */

interface FormFieldProps {
  name: string;
  validation?: ValidationRule;
  children: React.ReactNode;
}

function FormField({ name, validation, children }: FormFieldProps) {
  const form = React.useContext(FormContext);

  React.useEffect(() => {
    form?.registerValidation(name, validation);
  }, [name, validation, form]);

  return (
    <FormFieldContext.Provider value={name}>
      {children}
    </FormFieldContext.Provider>
  );
}

/* ---------------------------------- */
/* Form Item                          */
/* ---------------------------------- */

function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.formItem, className)} {...props} />;
}

/* ---------------------------------- */
/* Form Label                         */
/* ---------------------------------- */

function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn(styles.formLabel, className)} {...props} />;
}

/* ---------------------------------- */
/* Form Control                       */
/* ---------------------------------- */

type InputChildProps = {
  value?: unknown;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
};

interface FormControlProps {
  children: React.ReactElement<InputChildProps>;
}

function FormControl({ children }: FormControlProps) {
  const name = React.useContext(FormFieldContext) ?? "";

  const field = useField(name);

  React.useEffect(() => {
    if (!name) {
      throw new Error("FormControl must be inside <FormField>");
    }
  }, [name]);

  return React.cloneElement(children, {
    value: field.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      field.setValue(e.target.value);
    },
    onBlur: field.onBlur,
  });
}

/* ---------------------------------- */
/* Form Message                       */
/* ---------------------------------- */

function FormMessage() {
  const name = React.useContext(FormFieldContext) ?? "";

  const field = useField(name);

  React.useEffect(() => {
    if (!name) {
      throw new Error("FormMessage must be inside <FormField>");
    }
  }, [name]);

  if (!field.error) return null;

  return <p className={styles.formMessage}>{field.error}</p>;
}
export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage };
