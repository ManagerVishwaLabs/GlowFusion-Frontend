import { useState } from "react";

import User from "../../../../../assets/images/User.png";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DocumentIcon,
  SecurityIcon,
  Users,
} from "../../../../../components/icons";
import { Button, Checkbox, Input, Select } from "../../../../../components/ui";
import type { CompanyFormData } from "../../../types/company";
import styles from "./StepThree.module.css";

type Props = {
  formData: CompanyFormData;
  errors: Partial<Record<keyof CompanyFormData, string>>;
  updateForm: (field: keyof CompanyFormData, value: string | boolean) => void;
  onPrevious: () => void;
  onSubmit: () => void;
};

const StepThree = ({ errors, formData, onPrevious, updateForm }: Props) => {
  const [agree, setAgree] = useState(true);

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>User Details</h1>

          <p>Add the admin details who will manage this account.</p>
        </div>

        <img alt="user" className={styles.headerImage} src={User} />
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
          <Input
            error={errors.fullName}
            label="Full Name"
            onChange={(value) => updateForm("fullName", value)}
            placeholder="Enter full name"
            value={formData.fullName}
          />

          <Input
            error={errors.email}
            label="Email Address"
            onChange={(value) => updateForm("email", value)}
            placeholder="Enter email address"
            value={formData.email}
          />

          <Input
            error={errors.adminPhone}
            label="Phone Number"
            onChange={(value) => updateForm("adminPhone", value)}
            placeholder="Enter phone number"
            value={formData.adminPhone}
          />

          <Select
            error={errors.designation}
            label={"Designation"}
            onChange={(selected) => updateForm("designation", selected.value)}
            options={[
              "Developer",
              "Project Manager",
              "HR Manager",
              "Team Lead",
            ]}
            value={formData.designation}
          />
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
          <Input
            error={errors.password}
            label="Password"
            onChange={(value) => updateForm("password", value)}
            placeholder="Enter password"
            type={"password"}
            value={formData.password}
          />

          {/* CONFIRM PASSWORD */}
          <Input
            error={errors.confirmPassword}
            label="Confirm Password"
            onChange={(value) => updateForm("confirmPassword", value)}
            placeholder="Confirm password"
            type={"password"}
            value={formData.confirmPassword}
          />
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
        <Button onClick={onPrevious} variant="outline">
          <ArrowLeftIcon size={18} />
          Previous
        </Button>

        <Button onClick={() => {}}>
          Create Account
          <ArrowRightIcon color="#fff" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
