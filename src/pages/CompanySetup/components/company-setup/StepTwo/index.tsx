import styles from "./StepTwo.module.css";

import { Input, Label, Button } from "../../../../../components/ui";

import {
  SocialIcon,
  ArrowRightIcon,
  ChevronLeft,
  BusinessOverviewIcon,
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
} from "../../../../../components/icons";
import cmp from "../../../asserts/img/cmp.png";
import type { CompanyFormData } from "../../../types/company";

type Props = {
  formData: CompanyFormData;
  errors: Partial<Record<keyof CompanyFormData, string>>;
  updateForm: (field: keyof CompanyFormData, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
};

const StepTwo = ({
  formData,
  errors,
  updateForm,
  onNext,
  onPrevious,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Company Profile</h1>

          <p>Tell us more about your company and your business.</p>
        </div>

        <img src={cmp} alt="profile" className={styles.headerImage} />
      </div>

      {/* BUSINESS OVERVIEW */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <BusinessOverviewIcon />
          </div>

          <h3>Business Overview</h3>
        </div>

        <div className={styles.field}>
          <Label>About Company *</Label>

          <textarea
            className={styles.textarea}
            value={formData.aboutCompany}
            onChange={(e) => updateForm("aboutCompany", e.target.value)}
            placeholder="Write about your company..."
          />

          {errors.aboutCompany && (
            <span className={styles.error}>{errors.aboutCompany}</span>
          )}
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <Input
              placeholder="Your company vision or mission"
              label="Vision / Mission"
              value={formData.visionMission}
              error={!!errors.visionMission}
              className={errors.visionMission ? styles.inputError : ""}
              onChange={(value) => updateForm("visionMission", value)}
            />

            {errors.visionMission && (
              <span className={styles.error}>{errors.visionMission}</span>
            )}
          </div>

          <div className={styles.field}>
            <Label>Founded Year</Label>

            <Input
              placeholder="Your company founded year"
              value={formData.foundedYear}
              className={errors.foundedYear ? styles.inputError : ""}
              onChange={(value) =>
                updateForm("foundedYear", value.replace(/\D/g, ""))
              }
            />

            {errors.foundedYear && (
              <span className={styles.error}>{errors.foundedYear}</span>
            )}
          </div>

          <div className={styles.field}>
            <Label>Registration Number</Label>

            <Input
              placeholder="Enter registration number"
              value={formData.registrationNumber}
              className={errors.registrationNumber ? styles.inputError : ""}
              onChange={(value) => updateForm("registrationNumber", value)}
            />

            {errors.registrationNumber && (
              <span className={styles.error}>{errors.registrationNumber}</span>
            )}
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <SocialIcon size={18} />
          </div>

          <h3>Social Presence</h3>
        </div>

        <div className={styles.socialGrid}>
          {/* LINKEDIN */}
          <div className={styles.field}>
            <Label>LinkedIn</Label>

            <div className={styles.inputWrapper}>
              <LinkedInIcon size={18} className={styles.socialIcon} />

              <Input
                placeholder="https://linkedin.com/company/"
                className={styles.socialInput}
                onChange={(value) => updateForm("linkedin", value)}
              />
            </div>
          </div>

          {/* INSTAGRAM */}
          <div className={styles.field}>
            <Label>Instagram</Label>

            <div className={styles.inputWrapper}>
              <InstagramIcon size={18} className={styles.socialIcon} />

              <Input
                placeholder="https://instagram.com/yourcompany"
                className={styles.socialInput}
                onChange={(value) => updateForm("instagram", value)}
              />
            </div>
          </div>

          {/* FACEBOOK */}
          <div className={styles.field}>
            <Label>Facebook</Label>

            <div className={styles.inputWrapper}>
              <FacebookIcon size={18} className={styles.socialIcon} />

              <Input
                placeholder="https://facebook.com/yourcompany"
                className={styles.socialInput}
                onChange={(value) => updateForm("facebook", value)}
              />
            </div>
          </div>

          {/* TWITTER */}
          <div className={styles.field}>
            <Label>Twitter</Label>

            <div className={styles.inputWrapper}>
              <TwitterIcon size={18} className={styles.socialIcon} />

              <Input
                placeholder="https://twitter.com/yourcompany"
                className={styles.socialInput}
                onChange={(value) => updateForm("twitter", value)}
              />
            </div>
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
          <ChevronLeft size={16} />
          Previous
        </Button>

        <Button className={styles.nextButton} onClick={onNext}>
          Next
          <ArrowRightIcon size={16} color="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
