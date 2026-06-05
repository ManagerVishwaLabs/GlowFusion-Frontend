

import * as React from "react";
import styles from "./Empty.module.css";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={`${styles.empty} ${className || ""}`}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={`${styles.header} ${className || ""}`}
      {...props}
    />
  );
}

type EmptyMediaVariant = "default" | "icon";

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: EmptyMediaVariant }) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={`${styles.media} ${variant === "icon" ? styles.mediaIcon : ""} ${className || ""}`}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={`${styles.title} ${className || ""}`}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={`${styles.description} ${className || ""}`}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={`${styles.content} ${className || ""}`}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
};
