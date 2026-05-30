import * as React from "react";
import styles from "./Breadcrumb.module.css";
import ChevronRight from "../../icons/ChevronRight";
import MoreHorizontal from "../../icons/MoveHorizontalIcon";

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={`${styles.list} ${className || ""}`}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={`${styles.item} ${className || ""}`}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      "data-slot": "breadcrumb-link",
      className:
        `${styles.link} ${className || ""} ${(children as React.ReactElement<any>).props.className || ""}`.trim(),
      ...props,
    });
  }

  return (
    <a
      data-slot="breadcrumb-link"
      className={`${styles.link} ${className || ""}`}
      {...props}
    >
      {children}
    </a>
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`${styles.page} ${className || ""}`}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={`${styles.separator} ${className || ""}`}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={`${styles.ellipsis} ${className || ""}`}
      {...props}
    >
      <MoreHorizontal className={styles.ellipsisIcon} />
      <span className={styles.srOnly}>More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
