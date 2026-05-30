import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "../../icons";
import styles from "./InputOtp.module.css";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={`${styles.container} ${containerClassName || ""}`}
      className={`${styles.input} ${className || ""}`}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={`${styles.group} ${className || ""}`}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={`${styles.slot} ${isActive ? styles.active : ""} ${className || ""}`}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className={styles.caretWrapper}>
          <div className={styles.caret} />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Minus className={styles.separator} />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
