import * as React from "react";
import type { SlotProps, ChildProps } from "./types";

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, asChild, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<ChildProps>;

      return React.cloneElement(child, {
        ...props,
        ...child.props,
        ref,
      });
    }

    return <>{children}</>;
  },
);

Slot.displayName = "Slot";

export default Slot;
