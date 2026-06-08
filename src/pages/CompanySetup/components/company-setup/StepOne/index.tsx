import { useRef, useState } from "react";
import styles from "./StepOne.module.css";

import {
  BuildingIcon,
  BrandingIcon,
  ChevronDown,
  UploadCloudIcon,
  ArrowRightIcon,
} from "../../../../../components/icons";

import { Button, Input, Label } from "../../../../../components/ui";

import building from "../../../asserts/img/building.png";
import type { CompanyFormData } from "../../../types/company";

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
            <Label htmlFor="companyName">Company Name</Label>

            <Input
              id="companyName"
              type="text"
              placeholder="Enter company name"
              value={formData.companyName}
              className={errors.companyName ? styles.inputError : ""}
              onChange={(e) => updateForm("companyName", e.target.value)}
            />

            {errors.companyName && (
              <span className={styles.error}>{errors.companyName}</span>
            )}
          </div>

          {/* Business Email */}
          <div className={styles.field}>
            <Label htmlFor="businessEmail">Business Email</Label>

            <Input
              id="businessEmail"
              type="email"
              placeholder="Enter business email"
              value={formData.businessEmail}
              className={errors.businessEmail ? styles.inputError : ""}
              onChange={(e) => updateForm("businessEmail", e.target.value)}
            />

            {errors.businessEmail && (
              <span className={styles.error}>{errors.businessEmail}</span>
            )}
          </div>

          {/* Phone */}
          <div className={styles.field}>
            <Label htmlFor="phoneNumber">Phone Number</Label>

            <div
              className={`${styles.phoneInput} ${
                errors.phoneNumber ? styles.phoneInputError : ""
              }`}
            >
              <div className={styles.countryCode}>IN +91</div>

              <Input
                id="phoneNumber"
                type="tel"
                maxLength={10}
                placeholder="Enter phone number"
                className={styles.phoneField}
                value={formData.phoneNumber}
                onChange={(e) =>
                  updateForm("phoneNumber", e.target.value.replace(/\D/g, ""))
                }
              />
            </div>

            {errors.phoneNumber && (
              <span className={styles.error}>{errors.phoneNumber}</span>
            )}
          </div>

          {/* Website */}
          <div className={styles.field}>
            <Label htmlFor="website">Website</Label>

            <div
              className={`${styles.websiteWrapper} ${
                errors.website ? styles.inputError : ""
              }`}
            >
              {/* <span className={styles.websitePrefix}>https://</span> */}

              <Input
                id="website"
                type="text"
                placeholder="yourwebsite.com"
                value={formData.website.replace(/^https?:\/\//, "")}
                className={styles.websiteInput}
                onChange={(e) => {
                  const value = e.target.value
                    .trim()
                    .replace(/^https?:\/\//, "")
                    .replace(/\s/g, "");

                  updateForm("website", value);
                }}
              />
            </div>

            {errors.website && (
              <span className={styles.error}>{errors.website}</span>
            )}
          </div>

          {/* Industry */}
          <div className={styles.field}>
            <Label>Industry</Label>

            <div className={styles.selectWrapper}>
              <select
                className={`${styles.select} ${
                  errors.industry ? styles.inputError : ""
                }`}
                value={formData.industry}
                onChange={(e) => updateForm("industry", e.target.value)}
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
            <Label>Company Size</Label>

            <div className={styles.selectWrapper}>
              <select
                className={`${styles.select} ${
                  errors.companySize ? styles.inputError : ""
                }`}
                value={formData.companySize}
                onChange={(e) => updateForm("companySize", e.target.value)}
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
            <Label>Country</Label>

            <Input
              placeholder="Enter country"
              value={formData.country}
              className={errors.country ? styles.inputError : ""}
              onChange={(e) => updateForm("country", e.target.value)}
            />

            {errors.country && (
              <span className={styles.error}>{errors.country}</span>
            )}
          </div>

          {/* State */}
          <div className={styles.field}>
            <Label>State</Label>

            <Input
              placeholder="Enter state"
              value={formData.state}
              className={errors.state ? styles.inputError : ""}
              onChange={(e) => updateForm("state", e.target.value)}
            />

            {errors.state && (
              <span className={styles.error}>{errors.state}</span>
            )}
          </div>

          {/* City */}
          <div className={styles.field}>
            <Label>City</Label>

            <Input
              placeholder="Enter city"
              value={formData.city}
              className={errors.city ? styles.inputError : ""}
              onChange={(e) => updateForm("city", e.target.value)}
            />

            {errors.city && <span className={styles.error}>{errors.city}</span>}
          </div>

          {/* Address */}
          <div className={`${styles.field} ${styles.addressField}`}>
            <Label>Address</Label>

            <Input
              placeholder="Enter complete address"
              value={formData.address}
              className={errors.address ? styles.inputError : ""}
              onChange={(e) => updateForm("address", e.target.value)}
            />

            {errors.address && (
              <span className={styles.error}>{errors.address}</span>
            )}
          </div>

          {/* Pincode */}
          <div className={styles.field}>
            <Label>Pin Code</Label>

            <Input
              maxLength={6}
              placeholder="Enter Pin code"
              value={formData.pincode}
              className={errors.pincode ? styles.inputError : ""}
              onChange={(e) =>
                updateForm("pincode", e.target.value.replace(/\D/g, ""))
              }
            />

            {errors.pincode && (
              <span className={styles.error}>{errors.pincode}</span>
            )}
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
