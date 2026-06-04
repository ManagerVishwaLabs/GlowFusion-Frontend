

import { useMemo } from "react";
import styles from "./Field.module.css";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={`${styles.fieldSet} ${className || ""}`}
      {...props}
    />
  );
}

type FieldLegendVariant = "legend" | "label";

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: FieldLegendVariant }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={`${styles.fieldLegend} ${styles[variant]} ${className || ""}`}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={`${styles.fieldGroup} ${className || ""}`}
      {...props}
    />
  );
}

type FieldOrientation = "vertical" | "horizontal" | "responsive";

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & { orientation?: FieldOrientation }) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={`${styles.field} ${styles[orientation]} ${className || ""}`}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={`${styles.fieldContent} ${className || ""}`}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={`${styles.fieldLabel} ${className || ""}`}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={`${styles.fieldTitle} ${className || ""}`}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={`${styles.fieldDescription} ${className || ""}`}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={`${styles.fieldSeparator} ${className || ""}`}
      {...props}
    >
      <div className={styles.separatorLine} />
      {children && (
        <span className={styles.separatorContent}>{children}</span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors) {
      return null;
    }

    if (errors.length === 1 && errors[0]?.message) {
      return errors[0].message;
    }

    return (
      <ul className={styles.errorList}>
        {errors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={`${styles.fieldError} ${className || ""}`}
      {...props}
    >
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
