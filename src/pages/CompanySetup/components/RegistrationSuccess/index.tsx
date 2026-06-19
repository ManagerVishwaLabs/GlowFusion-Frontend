import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../../components/ui";
import styles from "./RegistrationSuccess.module.css";

type Props = {
  title: string;
  description: string;
  redirectTo?: string;
  seconds?: number;
};

const RegistrationSuccess = ({
  description,
  redirectTo = "/login",
  seconds = 5,
  title,
}: Props) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate(redirectTo, {
            replace: true,
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate, redirectTo]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>{description}</p>

        <div className={styles.redirect}>
          Redirecting to login in <span>{countdown}s</span>
        </div>

        <Button
          className={styles.button}
          onClick={() => navigate(redirectTo, { replace: true })}
        >
          Go to login
        </Button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
