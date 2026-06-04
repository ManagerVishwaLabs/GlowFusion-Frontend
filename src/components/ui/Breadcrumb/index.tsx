import * as React from "react";
import { ChevronRight, MoreHorizontal } from "../../icons";
import styles from "./Breadcrumb.module.css";

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

type ChildProps = {
  className?: string;
  [key: string]: unknown;
};

function BreadcrumbLink({
  asChild,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement<ChildProps>(children)) {
    const child = children as React.ReactElement<ChildProps>;

    return React.cloneElement(child, {
      ...props,
      "data-slot": "breadcrumb-link",
      className: [styles.link, className, child.props.className]
        .filter(Boolean)
        .join(" "),
    });
  }

  return (
    <a
      data-slot="breadcrumb-link"
      className={[styles.link, className].filter(Boolean).join(" ")}
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
