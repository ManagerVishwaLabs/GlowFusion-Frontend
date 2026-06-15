import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/Logo.png";
import { Footer } from "../../components/";
import ArrowRightIcon from "../../components/icons/ArrowRightIcon";
import LockIcon from "../../components/icons/LockIcon";
import MailIcon from "../../components/icons/MailIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthService from "../../services/auth";
import { isValidEmail } from "../../utils/helpers";
import styles from "./Login.module.css";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    common?: string;
    email?: string;
    password?: string;
  }>({
    common: "",
    email: "",
    password: "",
  });

  const validateForm = (data: LoginFormData) => {
    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    const trimmedEmail = data.email.trim().toLowerCase();

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (data.password?.trim()?.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleLogin = async () => {
    const isValid = validateForm({
      email,
      password,
    });

    if (!isValid) {
      return;
    }

    try {
      const payload = {
        password,
        username: email.trim().toLowerCase(),
      };

      const response = await AuthService.loginUser(payload);

      if (response.success && Boolean(response.data)) {
        navigate("/");
      } else if (response.code) {
        setErrors({
          common: "Invalid email or password",
        });
      } else {
        setErrors({
          common: response.message,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.card}>
          <header className={styles.header}>
            <div className={styles.brand}>
              <div className={styles.logo}>
                <img alt="Logo" src={logo} />
                <h2>GROWFUSION</h2>
              </div>

              <div className={styles.dots}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
            </div>

            <h1>
              Welcome back <span>👋</span>
            </h1>

            <p>Login to your account and continue</p>
          </header>

          <div className={styles.form}>
            <Input
              error={errors.email}
              label="Email Address"
              leftIcon={<MailIcon color="#6b7280" size={20} />}
              onChange={setEmail}
              placeholder="you@example.com"
              type="email"
              value={email}
            />

            <Input
              error={errors.password}
              label="Password"
              leftIcon={<LockIcon color="#6b7280" size={20} />}
              onChange={setPassword}
              placeholder="Enter your password"
              type="password"
              value={password}
            />

            <a className={styles.forgot} href="#">
              Forgot password?
            </a>

            {errors.common && (
              <p className={styles.errorText}>{errors.common}</p>
            )}
            <Button
              className={styles.submit}
              onClick={handleLogin}
              type="submit"
            >
              Login to your account
              <ArrowRightIcon color="white" size={16} />
            </Button>

            <p className={styles.signup}>
              Don't have an account?
              <Button
                className={styles.link}
                onClick={() => navigate("/onboarding")}
                variant="link"
              >
                Sign up
              </Button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
