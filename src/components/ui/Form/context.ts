import * as React from "react";
import type { FormContextType } from "./types";

export const FormContext = React.createContext<FormContextType | null>(null);

export const FormFieldContext = React.createContext<string | null>(null);
