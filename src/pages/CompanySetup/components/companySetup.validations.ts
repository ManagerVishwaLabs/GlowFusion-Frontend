import {
  isValidEmail,
  isValidPhone,
  isValidWebsite,
  isValidYear,
} from "../../../utils/helpers";
import type { CompanyFormData } from "../companySetup.types";

export type FormErrors = Partial<Record<keyof CompanyFormData, string>>;

export const validateStepOne = (formData: CompanyFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!formData.businessEmail.trim()) {
    errors.businessEmail = "Business email is required";
  } else if (!isValidEmail(formData.businessEmail)) {
    errors.businessEmail = "Enter valid email";
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!isValidPhone(formData.phoneNumber)) {
    errors.phoneNumber = "Enter valid phone number";
  }

  if (!formData.website.trim()) {
    errors.website = "Website is required";
  } else if (!isValidWebsite(formData.website)) {
    errors.website = "Enter valid domain (example.com)";
  }

  if (!formData.industry) {
    errors.industry = "Select industry";
  }

  if (!formData.companySize) {
    errors.companySize = "Select company size";
  }

  if (!formData.country) {
    errors.country = "Select country";
  }

  if (!formData.state) {
    errors.state = "Select state";
  }

  if (!formData.city) {
    errors.city = "Select city";
  }

  if (!formData.address.trim()) {
    errors.address = "Address is required";
  }

  if (!formData.pincode.trim()) {
    errors.pincode = "Pincode is required";
  } else if (!/^\d{6}$/.test(formData.pincode)) {
    errors.pincode = "Enter valid pincode";
  }

  return errors;
};

export const validateStepTwo = (formData: CompanyFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.aboutCompany.trim()) {
    errors.aboutCompany = "About company is required";
  } else if (formData.aboutCompany.length < 30) {
    errors.aboutCompany = "Please write at least 30 characters";
  }

  const currentYear = new Date().getFullYear();

  if (formData.foundedYear && !isValidYear(formData.foundedYear)) {
    errors.foundedYear = "Enter valid year";
  } else if (
    formData.foundedYear &&
    Number(formData.foundedYear) > currentYear
  ) {
    errors.foundedYear = "Founded year cannot be in future";
  }

  if (formData.linkedin && !isValidWebsite(formData.linkedin)) {
    errors.linkedin = "Enter valid LinkedIn URL";
  }

  if (formData.instagram && !isValidWebsite(formData.instagram)) {
    errors.instagram = "Enter valid Instagram URL";
  }

  if (formData.facebook && !isValidWebsite(formData.facebook)) {
    errors.facebook = "Enter valid Facebook URL";
  }

  if (formData.twitter && !isValidWebsite(formData.twitter)) {
    errors.twitter = "Enter valid Twitter URL";
  }

  return errors;
};

export const validateStepThree = (formData: CompanyFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Enter valid email";
  }

  if (!formData.adminPhone.trim()) {
    errors.adminPhone = "Phone number is required";
  } else if (!isValidPhone(formData.adminPhone)) {
    errors.adminPhone = "Enter valid phone number";
  }

  if (!formData.designation.trim()) {
    errors.designation = "Designation is required";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Checkbox validation
  if (!formData.agreeTerms) {
    errors.agreeTerms = "Please accept terms & conditions";
  }

  return errors;
};
