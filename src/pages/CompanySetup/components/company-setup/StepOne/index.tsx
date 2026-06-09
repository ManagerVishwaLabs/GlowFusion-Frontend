import { useRef, useState } from "react";

import {
  ArrowRightIcon,
  BrandingIcon,
  BuildingIcon,
  ChevronDown,
  UploadCloudIcon,
} from "../../../../../components/icons";
import { Button, Input } from "../../../../../components/ui";
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
  // const [selectedColor, setSelectedColor] = useState(
  //   formData?.brandColor ?? "#4F6BFF",
  // );

  const [logo, setLogo] = useState<string | null>(formData?.logo ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const brandColors = ["#4F6BFF", "#5B5FF5", "#7BCB4C", "#F5A623", "#EF4444"];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be below 2MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

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
          <div className={styles.field}>
            <Input
              label="Company Name"
              id="companyName"
              type="text"
              placeholder="Enter company name"
              value={formData.companyName}
              error={errors.companyName}
              onChange={(value) => updateForm("companyName", value)}
            />
          </div>

          {/* Business Email */}
          <div className={styles.field}>
            <Input
              label="Business Email"
              id="businessEmail"
              type="email"
              placeholder="Enter business email"
              value={formData.businessEmail}
              error={errors.businessEmail}
              onChange={(value) => updateForm("businessEmail", value)}
            />
          </div>

          {/* Phone */}
          <div className={styles.field}>
            <div
              className={`${styles.phoneInput} ${
                errors.phoneNumber ? styles.phoneInputError : ""
              }`}
            >
              <div className={styles.countryCode}>IN +91</div>
              <Input
                label="Phone Number"
                id="phoneNumber"
                type="tel"
                maxLength={10}
                placeholder="Enter phone number"
                className={styles.phoneField}
                value={formData.phoneNumber}
                error={errors.phoneNumber}
                onChange={(value) =>
                  updateForm("phoneNumber", value.replace(/\D/g, ""))
                }
              />
            </div>
          </div>

          {/* Website */}
          <div className={styles.field}>
            <Input
              label="Website"
              id="website"
              type="text"
              placeholder="yourwebsite.com"
              value={formData.website.replace(/^https?:\/\//, "")}
              className={styles.websiteInput}
              onChange={(value) => {
                const website = value
                  .trim()
                  .replace(/^https?:\/\//, "")
                  .replace(/\s/g, "");

                updateForm("website", website);
              }}
              error={errors.website}
            />
          </div>

          {/* Industry */}
          <div className={styles.field}>
            {/* <Label>Industry</Label> */}

            <div className={styles.selectWrapper}>
              <select
                className={`${styles.select} ${
                  errors.industry ? styles.inputError : ""
                }`}
                value={formData.industry}
                onChange={(value) => updateForm("industry", value.target.value)}
              >
                <option value="">Select your industry</option>

                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
              </select>

              <ChevronDown className={styles.chevron} />
            </div>

            {errors.industry && (
              <span className={styles.error}>{errors.industry}</span>
            )}
          </div>

          {/* Company Size */}
          <div className={styles.field}>
            {/* <Label>Company Size</Label> */}

            <div className={styles.selectWrapper}>
              <select
                className={`${styles.select} ${
                  errors.companySize ? styles.inputError : ""
                }`}
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

              <ChevronDown className={styles.chevron} />
            </div>

            {errors.companySize && (
              <span className={styles.error}>{errors.companySize}</span>
            )}
          </div>

          {/* Country */}
          <div className={styles.field}>
            <Input
              label="Country"
              placeholder="Enter country"
              value={formData.country}
              error={errors.country}
              onChange={(value) => updateForm("country", value)}
            />
          </div>

          {/* State */}
          <div className={styles.field}>
            <Input
              label="State"
              placeholder="Enter state"
              value={formData.state}
              error={errors.state}
              onChange={(value) => updateForm("state", value)}
            />
          </div>

          {/* City */}
          <div className={styles.field}>
            <Input
              label="City"
              placeholder="Enter city"
              value={formData.city}
              error={errors.city}
              onChange={(value) => updateForm("city", value)}
            />
          </div>

          {/* Address */}
          <div className={`${styles.field} ${styles.addressField}`}>
            <Input
              label="Address"
              placeholder="Enter complete address"
              value={formData.address}
              error={errors.address}
              onChange={(value) => updateForm("address", value)}
            />
          </div>

          {/* Pincode */}
          <div className={styles.field}>
            <Input
              label="Pincode"
              maxLength={6}
              placeholder="Enter Pin code"
              value={formData.pincode}
              className={errors.pincode ? styles.inputError : ""}
              error={errors.pincode}
              onChange={(value) =>
                updateForm("pincode", value.replace(/\D/g, ""))
              }
            />
          </div>
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
          <div className={styles.logoWrapper}>
            <h4>Company Logo</h4>

            <div
              className={styles.uploadBox}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
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
          </div>

          {/* <div className={styles.colorWrapper}>
            <Label>Brand Color</Label>

            <div className={styles.colorList}>
              {brandColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorCircle} ${
                    selectedColor === color ? styles.activeColor : ""
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    setSelectedColor(color);

                    updateForm("brandColor", color);
                  }}
                />
              ))}
            </div>
          </div> */}
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
