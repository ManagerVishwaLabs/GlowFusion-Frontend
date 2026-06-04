import * as React from "react";
import { Circle } from "../../icons";
import styles from "./RadioGroup.module.css";

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null,
);

function useRadioGroup() {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroup components must be used within a RadioGroup");
  }
  return context;
}

interface RadioGroupProps extends Omit<
  React.ComponentProps<"div">,
  "defaultValue"
> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

function RadioGroup({
  className,
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  name = "radio-group",
  disabled = false,
  children,
  ...props
}: RadioGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );

  const combinedClassName = [styles.group, className].filter(Boolean).join(" ");

  return (
    <RadioGroupContext.Provider
      value={{ value, onValueChange: handleValueChange, name, disabled }}
    >
      <div
        data-slot="radio-group"
        role="radiogroup"
        className={combinedClassName}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps extends Omit<
  React.ComponentProps<"button">,
  "value"
> {
  value: string;
}

function RadioGroupItem({
  className,
  value,
  disabled: itemDisabled,
  ...props
}: RadioGroupItemProps) {
  const {
    value: selectedValue,
    onValueChange,
    disabled: groupDisabled,
  } = useRadioGroup();
  const isSelected = selectedValue === value;
  const isDisabled = itemDisabled || groupDisabled;

  const combinedClassName = [
    styles.item,
    isSelected ? styles.itemSelected : "",
    isDisabled ? styles.itemDisabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      data-state={isSelected ? "checked" : "unchecked"}
      data-slot="radio-group-item"
      disabled={isDisabled}
      className={combinedClassName}
      onClick={() => !isDisabled && onValueChange(value)}
      {...props}
    >
      {isSelected && (
        <span className={styles.indicator}>
          <Circle className={styles.icon} />
        </span>
      )}
    </button>
  );
}

export { RadioGroup, RadioGroupItem };
