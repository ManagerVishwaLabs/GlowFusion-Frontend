import { useEffect, useMemo, useRef, useState } from "react";

import { combineClasses } from "../../../utils/helpers";
import { ChevronDown } from "../../icons";
import styles from "./Select.module.css";

interface SelectOption {
  label: string;
  value: string;
}

type SelectOptions = string[] | SelectOption[];

interface SelectProps {
  label?: string;
  placeholder?: string;
  error?: string;
  helpText?: string;

  options: SelectOptions;

  value?: string;

  searchable?: boolean;
  combobox?: boolean;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;

  onChange?: (option: SelectOption) => void;
  onInputChange?: (value: string) => void;
}

const Select = ({
  combobox = false,
  disabled = false,
  error,
  helpText,
  label,
  loading = false,
  onChange,
  onInputChange,
  options,
  placeholder = "Select...",
  required = false,
  searchable = false,
  value = "",
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const normalizedOptions = useMemo<SelectOption[]>(() => {
    return options.map(
      (option): SelectOption =>
        typeof option === "string"
          ? {
              label: option,
              value: option,
            }
          : option,
    );
  }, [options]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchable) return normalizedOptions;

    return normalizedOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [normalizedOptions, searchable, inputValue]);

  const selectedOption = useMemo(
    () => normalizedOptions.find((option) => option.value === value),
    [normalizedOptions, value],
  );

  const handleSelect = (option: SelectOption) => {
    setInputValue(option.label);

    onChange?.(option);

    setOpen(false);
  };

  return (
    <div className={styles.select} ref={wrapperRef}>
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} data-disabled={disabled}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        {searchable || combobox ? (
          <input
            className={combineClasses(styles.input, error && styles.inputError)}
            disabled={disabled}
            onBlur={() => {
              if (!combobox && selectedOption) {
                setInputValue(selectedOption.label);
                onChange?.(selectedOption);
              }
            }}
            onChange={(event) => {
              const newValue = event.target.value;

              setInputValue(newValue);

              if (combobox) {
                onChange?.({
                  label: newValue,
                  value: newValue,
                });
              }
              onInputChange?.(newValue);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            value={inputValue}
          />
        ) : (
          <button
            className={combineClasses(
              styles.trigger,
              error && styles.inputError,
              !selectedOption ? styles.placeholder : "",
            )}
            disabled={disabled}
            onClick={() => setOpen((prev) => !prev)}
            type="button"
          >
            {selectedOption?.label || placeholder}
          </button>
        )}
        <ChevronDown className={styles.chevron} />
        {loading && <span className={styles.loading} />}
      </div>
      {helpText && <span className={styles.helpText}>{helpText}</span>}

      {error && <span className={styles.error}>{error}</span>}

      {open && (
        <div className={styles.dropdown}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                className={combineClasses(
                  styles.option,
                  option.value === selectedOption?.value
                    ? styles.optionSelected
                    : "",
                )}
                key={option.value + index}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : loading ? (
            <div className={styles.empty}>Loading...</div>
          ) : (
            <div className={styles.empty}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
