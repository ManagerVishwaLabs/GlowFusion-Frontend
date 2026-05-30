

import * as React from "react";
import styles from "./Avatar.module.css";

interface AvatarContextValue {
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
  imageError: boolean;
  setImageError: (error: boolean) => void;
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

function useAvatar() {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error("Avatar components must be used within an Avatar");
  }
  return context;
}

interface AvatarProps extends React.ComponentProps<"span"> {}

function Avatar({
  className,
  children,
  ...props
}: AvatarProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const combinedClassName = [styles.avatar, className]
    .filter(Boolean)
    .join(" ");

  return (
    <AvatarContext.Provider value={{ imageLoaded, setImageLoaded, imageError, setImageError }}>
      <span
        data-slot="avatar"
        className={combinedClassName}
        {...props}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  );
}

interface AvatarImageProps extends React.ComponentProps<"img"> {}

function AvatarImage({
  className,
  src,
  alt,
  onLoad,
  onError,
  ...props
}: AvatarImageProps) {
  const { setImageLoaded, setImageError, imageError } = useAvatar();

  const handleLoad = React.useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
    onLoad?.(e);
  }, [setImageLoaded, onLoad]);

  const handleError = React.useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    onError?.(e);
  }, [setImageError, onError]);

  if (imageError) {
    return null;
  }

  const combinedClassName = [styles.avatarImage, className]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      data-slot="avatar-image"
      src={src}
      alt={alt}
      className={combinedClassName}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
}

interface AvatarFallbackProps extends React.ComponentProps<"span"> {
  delayMs?: number;
}

function AvatarFallback({
  className,
  delayMs = 0,
  children,
  ...props
}: AvatarFallbackProps) {
  const { imageLoaded, imageError } = useAvatar();
  const [canRender, setCanRender] = React.useState(delayMs === 0);

  React.useEffect(() => {
    if (delayMs > 0) {
      const timer = setTimeout(() => setCanRender(true), delayMs);
      return () => clearTimeout(timer);
    }
  }, [delayMs]);

  if (imageLoaded || !canRender) {
    return null;
  }

  const combinedClassName = [styles.avatarFallback, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      data-slot="avatar-fallback"
      className={combinedClassName}
      {...props}
    >
      {children}
    </span>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
