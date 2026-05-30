

import * as React from "react";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends React.ComponentProps<"div"> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  const combinedClassName = [styles.skeleton, className]
    .filter(Boolean)
    .join(" ");

  return <div data-slot="skeleton" className={combinedClassName} {...props} />;
}

export { Skeleton };
