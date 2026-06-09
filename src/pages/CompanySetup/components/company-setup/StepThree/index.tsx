import { useState } from "react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDown,
  DocumentIcon,
  EyeIcon,
  SecurityIcon,
  Users,
} from "../../../../../components/icons";
import { Button, Checkbox, Input } from "../../../../../components/ui";
import User from "../../../asserts/img/User.png";
import type { CompanyFormData } from "../../../types/company";
import styles from "./StepThree.module.css";

type Props = {
  formData: CompanyFormData;
  errors: Partial<Record<keyof CompanyFormData, string>>;
  updateForm: (field: keyof CompanyFormData, value: string | boolean) => void;
  onPrevious: () => void;
  onSubmit: () => void;
};

const StepThree = ({ onPrevious }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agree, setAgree] = useState(true);

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>User Details</h1>

          <p>Add the admin details who will manage this account.</p>
        </div>

        <img src={User} alt="user" className={styles.headerImage} />
      </div>

      {/* ADMIN INFORMATION */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <Users size={18} />
          </div>

          <h3>Admin Information</h3>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <Input label="Full Name" placeholder="Enter full name" />
          </div>

          <div className={styles.field}>
            <Input label="Email Address" placeholder="Enter email address" />
          </div>

          <div className={styles.field}>
            <div className={styles.phoneInput}>
              <div className={styles.countryCode}>🇮🇳 +91</div>

              <Input
                label="Phone Number"
                placeholder="Enter phone number"
                className={styles.phoneField}
              />
            </div>
          </div>

          <div className={styles.field}>
            {/* <Label>Designation *</Label> */}

            <div className={styles.selectWrapper}>
              <select className={styles.select}>
                <option>Select designation</option>
              </select>

              <ChevronDown className={styles.chevron} />
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <SecurityIcon size={18} />
          </div>

          <h3>Security</h3>
        </div>

        <div className={styles.securityGrid}>
          {/* PASSWORD */}
          <div className={styles.field}>
            {/* <Label>Password *</Label> */}

            <div className={styles.passwordWrapper}>
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeIcon size={18} showPassword={showPassword} />
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className={styles.field}>
            {/* <Label>Confirm Password *</Label> */}

            <div className={styles.passwordWrapper}>
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <EyeIcon size={18} showPassword={showConfirmPassword} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AGREEMENT */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <DocumentIcon size={18} />
          </div>

          <h3>Agreement</h3>
        </div>

        <div className={styles.checkboxWrapper}>
          <Checkbox
            checked={agree}
            onCheckedChange={(checked) => setAgree(checked as boolean)}
          />

          <div className={styles.checkboxLabel}>
            I agree to the{" "}
            <span className={styles.link}>Terms & Conditions</span> and{" "}
            <span className={styles.link}>Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className={styles.footer}>
        <Button
          variant="outline"
          className={styles.previousButton}
          onClick={onPrevious}
        >
          <ArrowLeftIcon size={18} color="#fff" />
          Previous
        </Button>

        <Button onClick={() => {}} className={styles.createButton}>
          Create Account
          <ArrowRightIcon size={18} color="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
