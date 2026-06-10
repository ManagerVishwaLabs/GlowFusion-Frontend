import {
  isValidEmail,
  isValidPhone,
  isValidWebsite,
  isValidYear,
} from "../../../utils/helpers";
import type { CompanyFormData } from "../companySetup.types";

type FormErrors = Partial<Record<keyof CompanyFormData, string>>;

const validateStepOne = (formData: CompanyFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!formData.companyEmail.trim()) {
    errors.companyEmail = "Business email is required";
  } else if (!isValidEmail(formData.companyEmail)) {
    errors.companyEmail = "Enter valid email";
  }

  if (!formData.contactPhone.trim()) {
    errors.contactPhone = "Phone number is required";
  } else if (!isValidPhone(formData.contactPhone)) {
    errors.contactPhone = "Enter valid phone number";
  }

  if (!formData.website.trim()) {
    errors.website = "Website is required";
  } else if (!isValidWebsite(formData.website)) {
    errors.website = "Enter valid domain (example.com)";
  }

  if (!formData.industry) {
    errors.industry = "Please select industry";
  }

  if (!formData.companySize) {
    errors.companySize = "Please select company size";
  }

  if (!formData.country) {
    errors.country = "Please enter your country";
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

const validateStepTwo = (formData: CompanyFormData): FormErrors => {
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

const validateStepThree = (formData: CompanyFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!formData.userEmail.trim()) {
    errors.userEmail = "Email is required";
  } else if (!isValidEmail(formData.userEmail)) {
    errors.userEmail = "Enter valid email";
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

export { validateStepOne, validateStepThree, validateStepTwo };
