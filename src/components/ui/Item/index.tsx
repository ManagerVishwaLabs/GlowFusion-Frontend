

import * as React from "react";
import styles from "./Item.module.css";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={`${styles.itemGroup} ${className || ""}`}
      {...props}
    />
  );
}

function ItemSeparator({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="item-separator"
      className={`${styles.itemSeparator} ${className || ""}`}
      {...props}
    />
  );
}

type ItemVariant = "default" | "outline" | "muted";
type ItemSize = "default" | "sm";

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: ItemVariant;
  size?: ItemSize;
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      "data-slot": "item",
      "data-variant": variant,
      "data-size": size,
      className: `${styles.item} ${styles[variant]} ${styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`]} ${className || ""} ${(children as React.ReactElement<any>).props.className || ""}`.trim(),
      ...props,
    });
  }

  return (
    <div
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={`${styles.item} ${styles[variant]} ${styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`]} ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

type ItemMediaVariant = "default" | "icon" | "image";

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: ItemMediaVariant }) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={`${styles.itemMedia} ${styles[`media${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} ${className || ""}`}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={`${styles.itemContent} ${className || ""}`}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={`${styles.itemTitle} ${className || ""}`}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={`${styles.itemDescription} ${className || ""}`}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={`${styles.itemActions} ${className || ""}`}
      {...props}
    />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={`${styles.itemHeader} ${className || ""}`}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={`${styles.itemFooter} ${className || ""}`}
      {...props}
    />
  );
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
