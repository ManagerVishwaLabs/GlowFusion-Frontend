import * as React from "react";
import styles from "./Slider.module.css";

interface SliderProps extends Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> {
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
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<number[]>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const values = isControlled ? controlledValue : uncontrolledValue;

  const trackRef = React.useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = React.useState<number | null>(null);

  const getPercentage = React.useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  const getValueFromPosition = React.useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;

      const rect = trackRef.current.getBoundingClientRect();

      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );

      const rawValue = min + percentage * (max - min);

      const steppedValue = Math.round(rawValue / step) * step;

      return Math.max(min, Math.min(max, steppedValue));
    },
    [min, max, step],
  );

  const updateValue = React.useCallback(
    (index: number, newValue: number) => {
      const clampedValue = Math.max(min, Math.min(max, newValue));

      const newValues = [...values];
      newValues[index] = clampedValue;

      if (!isControlled) {
        setUncontrolledValue(newValues);
      }

      onValueChange?.(newValues);
    },
    [values, isControlled, onValueChange, min, max],
  );

  const handleMouseDown =
    (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;

      e.preventDefault();
      setIsDragging(index);
    };

  const handleKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          updateValue(index, values[index] + step);
          break;

        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          updateValue(index, values[index] - step);
          break;

        default:
          break;
      }
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
  }, [isDragging, updateValue, getValueFromPosition]);

  const rangeStart = values.length > 1 ? getPercentage(Math.min(...values)) : 0;

  const rangeEnd = getPercentage(Math.max(...values));

  return (
    <div
      data-slot="slider"
      aria-disabled={disabled}
      className={[styles.root, disabled ? styles.disabled : "", className]
        .filter(Boolean)
        .join(" ")}
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
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={styles.thumb}
          style={{
            left: `${getPercentage(value)}%`,
          }}
          onMouseDown={handleMouseDown(index)}
          onKeyDown={handleKeyDown(index)}
        />
      ))}
    </div>
  );
}

export { Slider };
