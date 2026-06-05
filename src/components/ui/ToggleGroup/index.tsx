

import * as React from "react";
import styles from "./ToggleGroup.module.css";

type ToggleGroupVariant = "default" | "outline";
type ToggleGroupSize = "default" | "sm" | "lg";

interface ToggleGroupContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
  type: "single" | "multiple";
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  value: "",
  onValueChange: () => {},
  variant: "default",
  size: "default",
  type: "single",
});

interface ToggleGroupProps extends Omit<React.ComponentProps<"div">, "defaultValue"> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
}

function ToggleGroup({
  className,
  type = "single",
  value: controlledValue,
  defaultValue = type === "multiple" ? [] : "",
  onValueChange,
  variant = "default",
  size = "default",
  children,
  ...props
}: ToggleGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback((itemValue: string) => {
    let newValue: string | string[];

    if (type === "multiple") {
      const currentArray = Array.isArray(value) ? value : [];
      if (currentArray.includes(itemValue)) {
        newValue = currentArray.filter((v) => v !== itemValue);
      } else {
        newValue = [...currentArray, itemValue];
      }
    } else {
      newValue = value === itemValue ? "" : itemValue;
    }

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  }, [value, type, isControlled, onValueChange]);

  return (
    <div
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      role="group"
      className={`${styles.toggleGroup} ${className || ""}`}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ value, onValueChange: handleValueChange, variant, size, type }}>
        {children}
      </ToggleGroupContext.Provider>
    </div>
  );
}

interface ToggleGroupItemProps extends React.ComponentProps<"button"> {
  value: string;
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
}

function ToggleGroupItem({
  className,
  value: itemValue,
  variant: itemVariant,
  size: itemSize,
  children,
  disabled,
  ...props
}: ToggleGroupItemProps) {
  const { value, onValueChange, variant: groupVariant, size: groupSize, type } = React.useContext(ToggleGroupContext);
  
  const finalVariant = itemVariant || groupVariant;
  const finalSize = itemSize || groupSize;
  
  const isPressed = type === "multiple" 
    ? Array.isArray(value) && value.includes(itemValue)
    : value === itemValue;

  const sizeClass = finalSize === "sm" ? styles.sm : finalSize === "lg" ? styles.lg : styles.default;

  return (
    <button
      type="button"
      role="radio"
      aria-pressed={isPressed}
      data-state={isPressed ? "on" : "off"}
      data-slot="toggle-group-item"
      data-variant={finalVariant}
      data-size={finalSize}
      disabled={disabled}
      className={`${styles.item} ${styles[finalVariant]} ${sizeClass} ${isPressed ? styles.pressed : ""} ${className || ""}`}
      onClick={() => !disabled && onValueChange(itemValue)}
      {...props}
    >
      {children}
    </button>
  );
}

export { ToggleGroup, ToggleGroupItem };
