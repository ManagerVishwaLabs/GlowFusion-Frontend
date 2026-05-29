import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "../../icons";
import styles from "./Pagination.module.css";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={`${styles.pagination} ${className || ""}`}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={`${styles.content} ${className || ""}`}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={`${styles.item} ${className || ""}`} {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={`${styles.link} ${isActive ? styles.active : ""} ${className || ""}`}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={`${styles.previous} ${className || ""}`}
      {...props}
    >
      <ChevronLeft className={styles.icon} />
      <span>Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={`${styles.next} ${className || ""}`}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className={styles.icon} />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={`${styles.ellipsis} ${className || ""}`}
      {...props}
    >
      <MoreHorizontal className={styles.icon} />
      <span className={styles.srOnly}>More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
