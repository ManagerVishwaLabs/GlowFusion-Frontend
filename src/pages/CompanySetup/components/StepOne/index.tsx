import { useRef, useState } from "react";

import building from "../../../../assets/images/Building.png";
import {
  ArrowRightIcon,
  BrandingIcon,
  BuildingIcon,
  UploadCloudIcon,
} from "../../../../components/icons";
import { Button, Input, Select } from "../../../../components/ui";
import { combineClasses } from "../../../../utils/helpers";
import type { CommonStepProps } from "../../companySetup.types";
import styles from "./StepOne.module.css";

const StepOne = ({
  errors,
  formData,
  onNext,
  updateForm,
}: CommonStepProps & { onNext: () => void }) => {
  const [logo, setLogo] = useState<string | null>(
    formData?.companyLogoUrl ?? null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const handleLogoUpload = (file: FileList | null) => {
    if (!file) return;

    if (file[0].size > 0.1 * 1024 * 1024) {
      setLogoError("File size should be below 2MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file[0]);
    setLogo(imageUrl);

    updateForm("companyLogoUrl", imageUrl);
  };

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Company Details</h1>

          <p>Let’s start with the basic information about your company.</p>
        </div>

        <img alt="building" className={styles.headerImage} src={building} />
      </div>

      {/* BASIC INFORMATION */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <BuildingIcon size={18} />
          </div>

          <h3>Basic Information</h3>
        </div>

        <div className={styles.grid}>
          {/* Company Name */}
          <Input
            error={errors.companyName}
            id="companyName"
            label="Company Name"
            onChange={(value) => updateForm("companyName", value)}
            placeholder="Enter company name"
            required
            type="text"
            value={formData.companyName}
          />

          {/* Business Email */}
          <Input
            error={errors.companyEmail}
            id="companyEmail"
            label="Business Email"
            onChange={(value) => updateForm("companyEmail", value)}
            placeholder="Enter business email"
            required
            type="email"
            value={formData.companyEmail}
          />

          {/* Phone Number */}
          <Input
            error={errors.contactPhone}
            id="contactPhone"
            label="Phone Number"
            maxLength={10}
            onChange={(value) =>
              updateForm("contactPhone", value.replace(/\D/g, ""))
            }
            placeholder="Enter phone number"
            required
            type="tel"
            value={formData.contactPhone}
          />

          {/* Website */}
          <Input
            error={errors.website}
            id="website"
            label="Website"
            onChange={(value) => {
              updateForm("website", value);
            }}
            placeholder="yourwebsite.com"
            required
            type="text"
            value={formData.website}
          />

          {/* Industry */}
          <Select
            error={errors.industry}
            label="Industry"
            onChange={(selected) => {
              updateForm("industry", selected.value);
            }}
            options={["Technology", "Finance", "Healthcare", "Education"]}
            placeholder="Select your industry"
            required
            value={formData.industry}
          />

          {/* Company Size */}
          <Select
            error={errors.companySize}
            label="Company Size"
            onChange={(selected) => {
              updateForm("companySize", selected.value);
            }}
            options={[
              "1-10",
              "11-50",
              "51-200",
              "201-500",
              "501-1000",
              "1001-5000",
              "5000+",
            ]}
            placeholder="Select company size"
            required
            value={formData.companySize}
          />

          {/* Country */}
          <Input
            error={errors.country}
            label="Country"
            onChange={(value) => updateForm("country", value)}
            placeholder="Enter country"
            required
            value={formData.country}
          />

          {/* Address */}
          <Input
            error={errors.address}
            label="Address"
            onChange={(value) => updateForm("address", value)}
            placeholder="Enter complete address"
            required
            value={formData.address}
          />

          {/* Pincode */}
          <Input
            error={errors.pincode}
            label="Pincode"
            maxLength={6}
            onChange={(value) =>
              updateForm("pincode", value.replace(/\D/g, ""))
            }
            placeholder="Enter Pin code"
            required
            value={formData.pincode}
          />
        </div>
      </section>

      {/* BRANDING */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>
            <BrandingIcon size={18} />
          </div>

          <h3>Branding</h3>
        </div>

        <div className={styles.brandGrid}>
          <div>
            <h4>Company Logo</h4>

            <div
              className={combineClasses(
                styles.uploadBox,
                logoError ? styles.uploadError : "",
              )}
              onClick={() => {
                setLogoError(null);
                fileInputRef.current?.click();
              }}
            >
              <Input
                accept="image/*"
                hidden
                onChange={handleLogoUpload}
                ref={fileInputRef}
                type="file"
                value={""}
              />

              {logo ? (
                <img alt="logo" className={styles.logoPreview} src={logo} />
              ) : (
                <>
                  <UploadCloudIcon />

                  <span className={styles.uploadTitle}>Upload Logo</span>

                  <p>PNG, JPG up to 2MB</p>
                </>
              )}
            </div>
            {logoError && <span className={styles.error}>{logoError}</span>}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className={styles.footer}>
        <Button onClick={onNext}>
          Next
          <ArrowRightIcon color="#fff" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
