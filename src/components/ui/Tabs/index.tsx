

import * as React from "react";
import styles from "./Tabs.module.css";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs");
  }
  return context;
}

interface TabsProps extends Omit<React.ComponentProps<"div">, "defaultValue"> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function Tabs({
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback((newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  }, [isControlled, onValueChange]);

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div data-slot="tabs" className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabsListProps extends React.ComponentProps<"div"> {}

function TabsList({ className, ...props }: TabsListProps) {
  const combinedClassName = [styles.list, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      data-slot="tabs-list"
      role="tablist"
      className={combinedClassName}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ComponentProps<"button"> {
  value: string;
}

function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabs();
  const isSelected = selectedValue === value;

  const combinedClassName = [
    styles.trigger,
    isSelected ? styles.triggerActive : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      data-slot="tabs-trigger"
      className={combinedClassName}
      onClick={() => onValueChange(value)}
      {...props}
    />
  );
}

interface TabsContentProps extends React.ComponentProps<"div"> {
  value: string;
}

function TabsContent({ className, value, ...props }: TabsContentProps) {
  const { value: selectedValue } = useTabs();
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  const combinedClassName = [styles.content, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      data-slot="tabs-content"
      className={combinedClassName}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
