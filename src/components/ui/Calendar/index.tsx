import * as React from "react";
import { ChevronLeft, ChevronRight } from "../../icons";
import { DayPicker } from "react-day-picker";
import styles from "./Calendar.module.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`${styles.calendar} ${className || ""}`}
      classNames={{
        months: styles.months,
        month: styles.month,
        month_caption: styles.caption,
        caption_label: styles.captionLabel,
        nav: styles.nav,
        button_previous: styles.navButtonPrevious,
        button_next: styles.navButtonNext,
        weekdays: styles.headRow,
        weekday: styles.headCell,
        week: styles.row,
        day: styles.cell,
        day_button: styles.day,
        range_end: styles.dayRangeEnd,
        selected: styles.daySelected,
        today: styles.dayToday,
        outside: styles.dayOutside,
        disabled: styles.dayDisabled,
        range_middle: styles.dayRangeMiddle,
        hidden: styles.dayHidden,
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className={styles.icon} />
          ) : (
            <ChevronRight className={styles.icon} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
