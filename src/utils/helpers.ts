const combineClasses = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());

const isValidPhone = (phone: string) => {
  const normalized = phone.replace(/\D/g, "");
  return /^(91)?[6-9]\d{9}$/.test(normalized);
};

const isValidWebsite = (website: string) => {
  try {
    new URL(website.startsWith("http") ? website : `https://${website}`);
    return true;
  } catch {
    return false;
  }
};

const isValidYear = (year: string): boolean => {
  return /^\d{4}$/.test(year);
};

export {
  combineClasses,
  isValidEmail,
  isValidPhone,
  isValidWebsite,
  isValidYear,
};
