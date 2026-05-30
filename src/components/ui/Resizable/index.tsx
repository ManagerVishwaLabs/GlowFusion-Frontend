import * as React from "react";
import { GripVertical } from "../../icons";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "./Resizable.module.css";

type ResizablePanelGroupProps = React.ComponentProps<typeof PanelGroup>;

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <PanelGroup
      data-slot="resizable-panel-group"
      className={`${styles.panelGroup} ${className || ""}`}
      {...props}
    />
  );
}

type ResizablePanelProps = React.ComponentProps<typeof Panel>;

function ResizablePanel({ ...props }: ResizablePanelProps) {
  return <Panel data-slot="resizable-panel" {...props} />;
}

type ResizableHandleProps = React.ComponentProps<typeof PanelResizeHandle> & {
  withHandle?: boolean;
};

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizableHandleProps) {
  return (
    <PanelResizeHandle
      data-slot="resizable-handle"
      className={`${styles.handle} ${className || ""}`}
      {...props}
    >
      {withHandle && (
        <div className={styles.handleIcon}>
          <GripVertical className={styles.icon} />
        </div>
      )}
    </PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
