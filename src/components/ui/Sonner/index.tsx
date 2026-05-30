

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import styles from "./Sonner.module.css";

function SonnerToaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={styles.toaster}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { SonnerToaster };
