import { useState } from "react";
import { useParams } from "react-router-dom";

import logo from "../../assets/images/Logo.png";
import { Footer } from "../../components/";
import ArrowRightIcon from "../../components/icons/ArrowRightIcon";
import LockIcon from "../../components/icons/LockIcon";
import MailIcon from "../../components/icons/MailIcon";
import { Checkbox, Select } from "../../components/ui";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AuthService from "../../services/auth";
import InvitationService from "../../services/invitation";
import { isValidEmail, isValidPhone } from "../../utils/helpers";
import RegistrationSuccess from "../CompanySetup/components/RegistrationSuccess";
import styles from "./Signup.module.css";

interface SignupFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  designation: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const Signup = () => {
  const inviteCode = useParams<{ inviteCode: string }>().inviteCode;

  const [form, setForm] = useState<SignupFormData>({
    agreeTerms: false,
    confirmPassword: "",
    designation: "",
    email: "",
    fullName: "",
    password: "",
    phoneNumber: "",
  });
  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState({
    agreeTerms: "",
    common: "",
    confirmPassword: "",
    designation: "",
    email: "",
    fullName: "",
    password: "",
    phoneNumber: "",
  });

  if (!inviteCode) {
    return;
  }

  const updateField = (key: keyof SignupFormData, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      agreeTerms: "",
      common: "",
      confirmPassword: "",
      designation: "",
      email: "",
      fullName: "",
      password: "",
      phoneNumber: "",
    };

    let isValid = true;

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    const email = form.email.trim().toLowerCase();

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }

    if (!isValidPhone(form.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number";
      isValid = false;
    }

    if (!form.designation.trim()) {
      newErrors.designation = "Designation is required";
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 8) {
      newErrors.password = "Minimum 8 characters";
      isValid = false;
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!form.agreeTerms) {
      newErrors.agreeTerms = "Accept terms to continue";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        designation: form.designation.trim(),
        email: form.email.trim().toLowerCase(),
        fullName: form.fullName.trim(),
        inviteCode,
        password: form.password,
        phoneNumber: form.phoneNumber.trim(),
      };

      const response = await InvitationService.acceptInvite(inviteCode);

      if (response.success) {
        const inviteResponse = await AuthService.registerUser(payload);

        if (inviteResponse.success) {
          setSuccess(true);
        } else {
          setErrors((prev) => ({
            ...prev,
            common: inviteResponse.message || "Unable to create account",
          }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          common: response.message || "Unable to accept invite",
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        common: "Something went wrong",
      }));
    }
  };

  return (
    <>
      {success && (
        <RegistrationSuccess
          description="Your account has been created successfully and invite accepted."
          title="Registration Successful"
        />
      )}
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
                  {Array.from({
                    length: 25,
                  }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>

              <h1>Create account ✨</h1>

              <p>Join GrowFusion and get started</p>
            </header>

            <div className={styles.formWrapper}>
              <div className={styles.form}>
                <Input
                  error={errors.fullName}
                  label="Full Name"
                  onChange={(v) => updateField("fullName", v)}
                  value={form.fullName}
                />

                <Input
                  error={errors.email}
                  label="Email"
                  leftIcon={<MailIcon color="#6b7280" size={20} />}
                  onChange={(v) => updateField("email", v)}
                  type="email"
                  value={form.email}
                />

                <Input
                  error={errors.phoneNumber}
                  label="Phone Number"
                  onChange={(v) => updateField("phoneNumber", v)}
                  value={form.phoneNumber}
                />

                <Select
                  error={errors.designation}
                  label={"Designation"}
                  onChange={(selected) =>
                    updateField("designation", selected.value)
                  }
                  options={[
                    "Developer",
                    "Project Manager",
                    "HR Manager",
                    "Team Lead",
                  ]}
                  value={form.designation}
                />

                <Input
                  error={errors.password}
                  label="Password"
                  leftIcon={<LockIcon color="#6b7280" size={20} />}
                  onChange={(v) => updateField("password", v)}
                  type="password"
                  value={form.password}
                />

                <Input
                  error={errors.confirmPassword}
                  label="Confirm Password"
                  leftIcon={<LockIcon color="#6b7280" size={20} />}
                  onChange={(v) => updateField("confirmPassword", v)}
                  type="password"
                  value={form.confirmPassword}
                />
              </div>
              <div className={styles.checkboxWrapper}>
                <Checkbox
                  checked={form.agreeTerms}
                  onCheckedChange={(checked) =>
                    updateField("agreeTerms", checked)
                  }
                />

                <div className={styles.checkboxLabel}>
                  I agree to the
                  <span
                    className={styles.link}
                    onClick={() => {
                      console.log("link");
                    }}
                  >
                    &nbsp;Terms & Conditions
                  </span>
                  &nbsp;and
                  <span
                    className={styles.link}
                    onClick={() => {
                      console.log("link");
                    }}
                  >
                    &nbsp;Privacy Policy
                  </span>
                </div>
              </div>

              {(errors.common || errors.agreeTerms) && (
                <p className={styles.errorText}>
                  {errors.common || errors.agreeTerms}
                </p>
              )}

              <Button className={styles.submit} onClick={handleSignup}>
                Create Account & Accept Invite
                <ArrowRightIcon color="white" size={16} />
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Signup;
export type { SignupFormData };
