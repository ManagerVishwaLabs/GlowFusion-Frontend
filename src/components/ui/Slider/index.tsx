

import * as React from "react";
import styles from "./Slider.module.css";

interface SliderProps extends Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> {
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  disabled?: boolean;
}

function Slider({
  className,
  defaultValue = [0],
  value: controlledValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled = false,
  ...props
}: SliderProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const values = isControlled ? controlledValue : uncontrolledValue;
  
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState<number | null>(null);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;
  
  const getValueFromPosition = (clientX: number) => {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const updateValue = React.useCallback((index: number, newValue: number) => {
    const newValues = [...values];
    newValues[index] = newValue;
    
    if (!isControlled) {
      setUncontrolledValue(newValues);
    }
    onValueChange?.(newValues);
  }, [values, isControlled, onValueChange]);

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(index);
  };

  React.useEffect(() => {
    if (isDragging === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newValue = getValueFromPosition(e.clientX);
      updateValue(isDragging, newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, updateValue]);

  const rangeStart = values.length > 1 ? getPercentage(Math.min(...values)) : 0;
  const rangeEnd = getPercentage(Math.max(...values));

  return (
    <div
      data-slot="slider"
      className={`${styles.root} ${disabled ? styles.disabled : ""} ${className || ""}`}
      {...props}
    >
      <div ref={trackRef} data-slot="slider-track" className={styles.track}>
        <div
          data-slot="slider-range"
          className={styles.range}
          style={{
            left: `${rangeStart}%`,
            width: `${rangeEnd - rangeStart}%`,
          }}
        />
      </div>
      {values.map((value, index) => (
        <div
          key={index}
          data-slot="slider-thumb"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          tabIndex={disabled ? -1 : 0}
          className={styles.thumb}
          style={{ left: `${getPercentage(value)}%` }}
          onMouseDown={handleMouseDown(index)}
        />
      ))}
    </div>
  );
}

export { Slider };
