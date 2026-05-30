

import * as React from "react";
import styles from "./Card.module.css";

export interface CardProps extends React.ComponentProps<"div"> {}

function Card({ className, ...props }: CardProps) {
  const combinedClassName = [styles.card, className]
    .filter(Boolean)
    .join(" ");

  return <div data-slot="card" className={combinedClassName} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  const combinedClassName = [styles.cardHeader, className]
    .filter(Boolean)
    .join(" ");

  return <div data-slot="card-header" className={combinedClassName} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  const combinedClassName = [styles.cardTitle, className]
    .filter(Boolean)
    .join(" ");

  return <div data-slot="card-title" className={combinedClassName} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  const combinedClassName = [styles.cardDescription, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-slot="card-description" className={combinedClassName} {...props} />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  const combinedClassName = [styles.cardAction, className]
    .filter(Boolean)
    .join(" ");

  return <div data-slot="card-action" className={combinedClassName} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  const combinedClassName = [styles.cardContent, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-slot="card-content" className={combinedClassName} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  const combinedClassName = [styles.cardFooter, className]
    .filter(Boolean)
    .join(" ");

  return <div data-slot="card-footer" className={combinedClassName} {...props} />;
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
