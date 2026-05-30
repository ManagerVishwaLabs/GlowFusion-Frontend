import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Checkbox } from "../../components/ui/Checkbox";
import { Label } from "../../components/ui/Label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/Card";
import { Separator } from "../../components/ui/Separator";
import styles from "./SignUp.module.css";
// import type { constants } from "buffer";
import GoogleIcon from "../../components/icons/GoogleIcon";
import AppleIcon from "../../components/icons/AppleIcon";
import { User } from "../../components/icons";
import MailIcon from "../../components/icons/MailIcon";
import LockIcon from "../../components/icons/LockIcon";
import EyeIcon from "../../components/icons/EyeIcon";
import ArrowRightIcon from "../../components/icons/ArrowRightIcon";
import InfoCircleIcon from "../../components/icons/InfoCircleIcon";

export const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: "",
    };

    let isValid = true;

    // Full Name Validation
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (trimmedName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      newErrors.fullName = "Only letters and spaces are allowed";
      isValid = false;
    }

    // Email Validation
    const trimmedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password Validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain 8+ characters, uppercase, lowercase, number & special character";
      isValid = false;
    }

    // Confirm Password Validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Terms Validation
    if (!agreeTerms) {
      newErrors.agreeTerms = "You must accept Terms & Conditions";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Create button clicked");

    // Validate form
    const isValid = validateForm();

    if (!isValid) {
      console.log("Validation failed");
      return;
    }

    console.log("Validation success");

    const payload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      console.log("Submitting form...", payload);

      // API Call
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Signup success");

      // Redirect after success
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.decorativeDots}>
            {[...Array(25)].map((_, i) => (
              <span key={i} className={styles.dot}></span>
            ))}
          </div>

          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 3L4 14H12L11 21L20 10H12L13 3Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.logoText}>GrowFusion</span>
          </div>

          <h1 className={styles.heading}>
            Create your account
            <br />
            <span className={styles.gradientText}>and grow your brand</span>
          </h1>

          <p className={styles.subheading}>
            Join thousands of businesses using GrowFusion
            <br />
            to manage, connect, and scale — all in one place.
          </p>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon} data-color="purple">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 8V14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 11H17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Unified Platform</h3>
                <p>
                  All your marketing, leads, and content in one powerful
                  dashboard.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon} data-color="blue">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Smarter Growth</h3>
                <p>Data-driven insights to help you make better decisions.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon} data-color="teal">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L4 7V17L12 22L20 17V7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8L8 11V17L12 20L16 17V11L12 8Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3>Built for Scale</h3>
                <p>From startups to enterprises, we grow with you.</p>
              </div>
            </div>
          </div>

          <Card className={styles.testimonial}>
            <CardContent className={styles.testimonialContent}>
              <div className={styles.quoteIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 8C10 10.21 8.21 12 6 12C5.27 12 4.58 11.81 4 11.48V16C4 17.1 4.9 18 6 18H10V22H6C2.69 22 0 19.31 0 16V8C0 4.69 2.69 2 6 2C8.21 2 10 3.79 10 6V8Z"
                    fill="#F5A623"
                  />
                  <path
                    d="M24 8C24 10.21 22.21 12 20 12C19.27 12 18.58 11.81 18 11.48V16C18 17.1 18.9 18 20 18H24V22H20C16.69 22 14 19.31 14 16V8C14 4.69 16.69 2 20 2C22.21 2 24 3.79 24 6V8Z"
                    fill="#F5A623"
                  />
                </svg>
              </div>
              <p className={styles.quoteText}>
                GrowFusion helped us increase our leads
                <br />
                by 200% within the first 3 months!
              </p>
              <div className={styles.testimonialFooter}>
                <div className={styles.avatars}>
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                    alt="User 1"
                    className={styles.avatar}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                    alt="User 2"
                    className={styles.avatar}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                    alt="User 3"
                    className={styles.avatar}
                  />
                </div>
                <div className={styles.trustInfo}>
                  <span>Trusted by 10,000+ businesses</span>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#F5A623"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <Card className={styles.formCard}>
            <CardHeader className={styles.formCardHeader}>
              <CardTitle className={styles.formTitle}>
                Create your account
              </CardTitle>
              <CardDescription className={styles.formSubtitle}>
                Start your 14-day free trial. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent className={styles.formCardContent}>
              <div className={styles.socialButtons}>
                <Button variant="outline" className={styles.socialButton}>
                  <GoogleIcon />
                  <span>Sign up with Google</span>
                </Button>
                <Button variant="outline" className={styles.socialButton}>
                  <AppleIcon />
                  <span>Sign up with Apple</span>
                </Button>
              </div>

              <div className={styles.divider}>
                <Separator className={styles.separatorLine} />
                <span>or</span>
                <Separator className={styles.separatorLine} />
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <Label htmlFor="fullName">Full name</Label>
                  <div className={styles.inputWrapper}>
                    <User
                      size={20}
                      color="#6b7280"
                      className={styles.inputIcon}
                    />
                    <Input
                      type="text"
                      id="fullName"
                      placeholder="Enter your full name"
                      className={styles.inputField}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  {errors.fullName && (
                    <p className={styles.errorText}>{errors.fullName}</p>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <Label htmlFor="email">Email address</Label>
                  <div className={styles.inputWrapper}>
                    <MailIcon
                      size={20}
                      color="#6b7280"
                      className={styles.inputIcon}
                    />
                    <Input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      className={styles.inputField}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <p className={styles.errorText}>{errors.email}</p>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <Label htmlFor="password">Password</Label>
                  <div className={styles.inputWrapper}>
                    <LockIcon
                      size={20}
                      color="#6b7280"
                      className={styles.inputIcon}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={styles.inputField}
                    />
                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <EyeIcon
                        size={20}
                        color="#6b7280"
                        showPassword={showPassword}
                      />
                    </button>
                  </div>
                  {errors.password && (
                    <p className={styles.errorText}>
                      <span>⚠</span>
                      {errors.password}
                    </p>
                  )}
                  <span className={styles.helperText}>
                    Must be at least 8 characters{" "}
                    <InfoCircleIcon
                      size={16}
                      color="#6b7280"
                      className={styles.infoIcon}
                    />
                  </span>
                </div>

                <div className={styles.inputGroup}>
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className={styles.inputWrapper}>
                    <LockIcon
                      size={20}
                      color="#6b7280"
                      className={styles.inputIcon}
                    />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className={styles.inputField}
                    />
                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <EyeIcon
                        size={20}
                        color="#6b7280"
                        showPassword={showPassword}
                      />
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className={styles.errorText}>
                      <span>⚠</span>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className={styles.checkboxGroup}>
                  <div className={styles.checkboxWrapper}>
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) =>
                        setAgreeTerms(checked as boolean)
                      }
                    />
                    <Label htmlFor="terms" className={styles.checkboxLabel}>
                      I agree to the{" "}
                      <a href="#" className={styles.link}>
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className={styles.link}>
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  {errors.agreeTerms && (
                    <p className={styles.errorText}>{errors.agreeTerms}</p>
                  )}
                </div>

                <Button type="submit" className={styles.submitButton}>
                  <span>Create Your account</span>
                  <ArrowRightIcon />
                </Button>
              </form>

              <p className={styles.loginLink}>
                {"Already have an account? "}
                <Button
                  variant="link"
                  onClick={() => navigate("/login")}
                  className={styles.link}
                >
                  Log in
                </Button>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>© 2024 GrowFusion. All rights reserved.</span>
        <div className={styles.footerLinks}>
          <a href="#">Privacy Policy</a>
          <span className={styles.separator}>·</span>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};
