import { useRef, useState } from "react";

import {
  ArrowRightIcon,
  BrandingIcon,
  BuildingIcon,
  UploadCloudIcon,
} from "../../../../../components/icons";
import { Button, Input } from "../../../../../components/ui";
import { combineClasses } from "../../../../../utils/helpers";
import building from "../../../asserts/img/building.png";
import type { CompanyFormData } from "../../../types/company";
import styles from "./StepOne.module.css";

type Props = {
  formData: CompanyFormData;
  errors: Partial<Record<keyof CompanyFormData, string>>;
  updateForm: (field: keyof CompanyFormData, value: string) => void;
  nextStep: () => void;
};

const StepOne = ({ formData, errors, updateForm, nextStep }: Props) => {
  const [logo, setLogo] = useState<string | null>(formData?.logo ?? null);
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

    updateForm("logo", imageUrl);
  };

  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1>Company Details</h1>

          <p>Let’s start with the basic information about your company.</p>
        </div>

        <img src={building} alt="building" className={styles.headerImage} />
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
            label="Company Name"
            id="companyName"
            type="text"
            placeholder="Enter company name"
            value={formData.companyName}
            error={errors.companyName}
            onChange={(value) => updateForm("companyName", value)}
          />

          {/* Business Email */}
          <Input
            label="Business Email"
            id="businessEmail"
            type="email"
            placeholder="Enter business email"
            value={formData.businessEmail}
            error={errors.businessEmail}
            onChange={(value) => updateForm("businessEmail", value)}
          />

          {/* Phone Number */}
          <Input
            label="Phone Number"
            id="phoneNumber"
            type="tel"
            maxLength={10}
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            error={errors.phoneNumber}
            onChange={(value) =>
              updateForm("phoneNumber", value.replace(/\D/g, ""))
            }
          />

          {/* Website */}
          <Input
            label="Website"
            id="website"
            type="text"
            placeholder="yourwebsite.com"
            value={formData.website.replace(/^https?:\/\//, "")}
            onChange={(value) => {
              const website = value
                .trim()
                .replace(/^https?:\/\//, "")
                .replace(/\s/g, "");

              updateForm("website", website);
            }}
            error={errors.website}
          />

          {/* Industry */}
          <div>
            <select
              value={formData.industry}
              onChange={(value) => updateForm("industry", value.target.value)}
            >
              <option value="">Select your industry</option>

              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
            </select>
          </div>

          {/* Company Size */}
          <div>
            <select
              value={formData.companySize}
              onChange={(value) =>
                updateForm("companySize", value.target.value)
              }
            >
              <option value="">Select company size</option>

              <option value="1-10">1 - 10</option>
              <option value="11-50">11 - 50</option>
              <option value="51-200">51 - 200</option>
              <option value="201-500">201 - 500</option>
            </select>
          </div>

          {/* Country */}
          <Input
            label="Country"
            placeholder="Enter country"
            value={formData.country}
            error={errors.country}
            onChange={(value) => updateForm("country", value)}
          />

          {/* State */}
          <Input
            label="State"
            placeholder="Enter state"
            value={formData.state}
            error={errors.state}
            onChange={(value) => updateForm("state", value)}
          />

          {/* City */}
          <Input
            label="City"
            placeholder="Enter city"
            value={formData.city}
            error={errors.city}
            onChange={(value) => updateForm("city", value)}
          />

          {/* Address */}
          <Input
            label="Address"
            placeholder="Enter complete address"
            value={formData.address}
            error={errors.address}
            onChange={(value) => updateForm("address", value)}
          />

          {/* Pincode */}
          <Input
            label="Pincode"
            maxLength={6}
            placeholder="Enter Pin code"
            value={formData.pincode}
            error={errors.pincode}
            onChange={(value) =>
              updateForm("pincode", value.replace(/\D/g, ""))
            }
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
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleLogoUpload}
              />

              {logo ? (
                <img src={logo} alt="logo" className={styles.logoPreview} />
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
        <Button className={styles.nextButton} onClick={nextStep}>
          Next
          <ArrowRightIcon size={18} color="#fff" />
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
