import type { CompanyFormData } from "../../types/company";

export type FormErrors = Partial<Record<keyof CompanyFormData, string>>;

export const validateStepOne = (formData: CompanyFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!formData.businessEmail.trim()) {
    errors.businessEmail = "Business email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
    errors.businessEmail = "Enter valid email";
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
    errors.phoneNumber = "Enter valid phone number";
  }

  if (!formData.website.trim()) {
    errors.website = "Website is required";
  } else if (!/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(formData.website)) {
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

  if (formData.foundedYear && !/^\d{4}$/.test(formData.foundedYear)) {
    errors.foundedYear = "Enter valid year";
  } else if (
    formData.foundedYear &&
    Number(formData.foundedYear) > currentYear
  ) {
    errors.foundedYear = "Founded year cannot be in future";
  }

  const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/;

  if (formData.linkedin && !urlRegex.test(formData.linkedin)) {
    errors.linkedin = "Enter valid LinkedIn URL";
  }

  if (formData.instagram && !urlRegex.test(formData.instagram)) {
    errors.instagram = "Enter valid Instagram URL";
  }

  if (formData.facebook && !urlRegex.test(formData.facebook)) {
    errors.facebook = "Enter valid Facebook URL";
  }

  if (formData.twitter && !urlRegex.test(formData.twitter)) {
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
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter valid email";
  }

  if (!formData.adminPhone.trim()) {
    errors.adminPhone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(formData.adminPhone)) {
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
