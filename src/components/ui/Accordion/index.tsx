import * as React from "react";
import ChevronDownIcon from "../../icons/ChevronDown";
import styles from "./Accordion.module.css";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
}

interface AccordionProps extends React.ComponentProps<"div"> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
}

function Accordion({
  className,
  type = "single",
  defaultValue,
  value,
  onValueChange,
  collapsible = false,
  children,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue)
        ? defaultValue
        : defaultValue
          ? [defaultValue]
          : [];
    }
    return [];
  });

  React.useEffect(() => {
    if (value !== undefined) {
      setOpenItems(Array.isArray(value) ? value : value ? [value] : []);
    }
  }, [value]);

  const toggleItem = React.useCallback(
    (itemValue: string) => {
      setOpenItems((prev) => {
        let newItems: string[];
        if (type === "single") {
          if (prev.includes(itemValue)) {
            newItems = collapsible ? [] : prev;
          } else {
            newItems = [itemValue];
          }
        } else {
          if (prev.includes(itemValue)) {
            newItems = prev.filter((v) => v !== itemValue);
          } else {
            newItems = [...prev, itemValue];
          }
        }
        onValueChange?.(type === "single" ? newItems[0] || "" : newItems);
        return newItems;
      });
    },
    [type, collapsible, onValueChange],
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div data-slot="accordion" className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItem() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionItem components must be used within an AccordionItem",
    );
  }
  return context;
}

interface AccordionItemProps extends React.ComponentProps<"div"> {
  value: string;
}

function AccordionItem({
  className,
  value,
  children,
  ...props
}: AccordionItemProps) {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div
        data-slot="accordion-item"
        data-state={isOpen ? "open" : "closed"}
        className={`${styles.item} ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionTriggerProps extends React.ComponentProps<"button"> {}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem } = useAccordion();
  const { value, isOpen } = useAccordionItem();

  return (
    <div className={styles.header}>
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={isOpen ? "open" : "closed"}
        aria-expanded={isOpen}
        className={`${styles.trigger} ${className || ""}`}
        onClick={() => toggleItem(value)}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
        />
      </button>
    </div>
  );
}

interface AccordionContentProps extends React.ComponentProps<"div"> {}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItem();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      data-slot="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      className={styles.content}
      style={{ height: height !== undefined ? `${height}px` : undefined }}
      {...props}
    >
      <div
        ref={contentRef}
        className={`${styles.contentInner} ${className || ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
