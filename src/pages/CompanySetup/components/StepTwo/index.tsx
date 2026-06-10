import company from "../../../../assets/images/Company.png";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BusinessOverviewIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  SocialIcon,
  TwitterIcon,
} from "../../../../components/icons";
import { Button, Input } from "../../../../components/ui";
import Textarea from "../../../../components/ui/Textarea";
import type { CommonStepProps } from "../../companySetup.types";
import styles from "./StepTwo.module.css";

const StepTwo = ({
  errors,
  formData,
  onNext,
  onPrevious,
  updateForm,
}: CommonStepProps & { onNext: () => void; onPrevious: () => void }) => {
  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Company Profile</h1>

          <p>Tell us more about your company and your business.</p>
        </div>

        <img alt="profile" className={styles.headerImage} src={company} />
      </div>

      {/* BUSINESS OVERVIEW */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <BusinessOverviewIcon />
          </div>

          <h3>Business Overview</h3>
        </div>

        <div className={styles.grid}>
          <Textarea
            error={errors.aboutCompany}
            label={"About Company"}
            onChange={(value) => updateForm("aboutCompany", value)}
            placeholder="Write about your company..."
            required
            value={formData.aboutCompany}
          />
          <Textarea
            error={errors.visionMission}
            label="Vision / Mission"
            onChange={(value) => updateForm("visionMission", value)}
            placeholder="Your company vision or mission"
            value={formData.visionMission}
          />

          <Input
            error={errors.foundedYear}
            label="Founded Year"
            maxLength={4}
            onChange={(value) =>
              updateForm("foundedYear", value.replace(/\D/g, ""))
            }
            placeholder="Your company founded year"
            value={formData.foundedYear}
          />

          <Input
            error={errors.registrationNumber}
            label="Registration Number"
            onChange={(value) => updateForm("registrationNumber", value)}
            placeholder="Enter registration number"
            value={formData.registrationNumber}
          />
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
          <div className={styles.inputWrapper}>
            <LinkedInIcon className={styles.socialIcon} size={18} />

            <Input
              className={styles.socialInput}
              error={errors.linkedin}
              label="LinkedIn"
              onChange={(value) => updateForm("linkedin", value)}
              placeholder="https://linkedin.com/company/"
              value={formData.linkedin}
            />
          </div>

          {/* INSTAGRAM */}
          <div className={styles.inputWrapper}>
            <InstagramIcon className={styles.socialIcon} size={18} />

            <Input
              className={styles.socialInput}
              error={errors.instagram}
              label="Instagram"
              onChange={(value) => updateForm("instagram", value)}
              placeholder="https://instagram.com/yourcompany"
              value={formData.instagram}
            />
          </div>

          {/* FACEBOOK */}
          <div className={styles.inputWrapper}>
            <FacebookIcon className={styles.socialIcon} size={18} />

            <Input
              className={styles.socialInput}
              error={errors.facebook}
              label="Facebook"
              onChange={(value) => updateForm("facebook", value)}
              placeholder="https://facebook.com/yourcompany"
              value={formData.facebook}
            />
          </div>

          {/* TWITTER */}
          <div className={styles.inputWrapper}>
            <TwitterIcon className={styles.socialIcon} size={18} />

            <Input
              className={styles.socialInput}
              error={errors.twitter}
              label="Twitter"
              onChange={(value) => updateForm("twitter", value)}
              placeholder="https://twitter.com/yourcompany"
              value={formData.twitter}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className={styles.footer}>
        <Button onClick={onPrevious} variant="outline">
          <ArrowLeftIcon size={16} />
          Previous
        </Button>

        <Button onClick={onNext}>
          Next
          <ArrowRightIcon color="#fff" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
