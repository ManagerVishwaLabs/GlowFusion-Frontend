import {
  ArrowRightIcon,
  BusinessOverviewIcon,
  ChevronLeft,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  SocialIcon,
  TwitterIcon,
} from "../../../../../components/icons";
import { Button, Input } from "../../../../../components/ui";
import cmp from "../../../asserts/img/cmp.png";
import type { CompanyFormData } from "../../../types/company";
import styles from "./StepTwo.module.css";

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
          {/* <Label>About Company *</Label> */}

          <textarea
            className={styles.textarea}
            value={formData.aboutCompany}
            onChange={(e) => updateForm("aboutCompany", e.target.value)}
            placeholder="Write about your company..."
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            {/* <Label>Vision / Mission</Label> */}

            <Input
              label="Vision / Mission"
              placeholder="Your company vision or mission"
              value={formData.visionMission}
              error={errors.visionMission}
              onChange={(value) => updateForm("visionMission", value)}
            />
          </div>

          <div className={styles.field}>
            <Input
              label="Founded Year"
              placeholder="Your company founded year"
              value={formData.foundedYear}
              error={errors.foundedYear}
              onChange={(value) =>
                updateForm("foundedYear", value.replace(/\D/g, ""))
              }
            />
          </div>

          <div className={styles.field}>
            <Input
              label="Registration Number"
              placeholder="Enter registration number"
              value={formData.registrationNumber}
              error={errors.registrationNumber}
              onChange={(value) => updateForm("registrationNumber", value)}
            />
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
            <div className={styles.inputWrapper}>
              <LinkedInIcon size={18} className={styles.socialIcon} />

              <Input
                label="LinkedIn"
                placeholder="https://linkedin.com/company/"
                className={styles.socialInput}
              />
            </div>
          </div>

          {/* INSTAGRAM */}
          <div className={styles.field}>
            <div className={styles.inputWrapper}>
              <InstagramIcon size={18} className={styles.socialIcon} />

              <Input
                label="Instagram"
                placeholder="https://instagram.com/yourcompany"
                className={styles.socialInput}
              />
            </div>
          </div>

          {/* FACEBOOK */}
          <div className={styles.field}>
            <div className={styles.inputWrapper}>
              <FacebookIcon size={18} className={styles.socialIcon} />

              <Input
                label="Facebook"
                placeholder="https://facebook.com/yourcompany"
                className={styles.socialInput}
              />
            </div>
          </div>

          {/* TWITTER */}
          <div className={styles.field}>
            <div className={styles.inputWrapper}>
              <TwitterIcon size={18} className={styles.socialIcon} />

              <Input
                label="Twitter"
                placeholder="https://twitter.com/yourcompany"
                className={styles.socialInput}
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
