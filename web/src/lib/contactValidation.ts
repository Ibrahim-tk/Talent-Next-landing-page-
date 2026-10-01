import { detectCountry } from "@/content/phoneCountries";

export type ContactFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

/* Letters from any script, with single spaces, hyphens or apostrophes between them. */
const NAME = /^\p{L}+(?:[ '\u2019-]\p{L}+)*$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;

function checkName(value: string, label: string) {
  const v = value.trim();
  if (!v) return `${label} is required.`;
  if (v.length < 2) return `${label} must be at least 2 characters.`;
  if (v.length > 50) return `${label} must be 50 characters or fewer.`;
  if (!NAME.test(v)) return `${label} can only contain letters, spaces, hyphens and apostrophes.`;
}

export function validateField(name: keyof ContactFields, value: string): string | undefined {
  switch (name) {
    case "firstName":
      return checkName(value, "First name");
    case "lastName":
      return checkName(value, "Last name");
    case "email": {
      const v = value.trim();
      if (!v) return "Email address is required.";
      if (v.length > 254 || !EMAIL.test(v)) return "Enter a valid email address, like name@company.com.";
      return;
    }
    case "phone": {
      if (!value) return "Phone number is required.";
      if (!value.startsWith("+")) return "Start with your country code, like +1 or +92.";
      const country = detectCountry(value);
      if (!country) return "Choose a supported country code from the list.";
      const national = value.slice(country.dial.length);
      const [min, max] = country.digits;
      if (national.length < min || national.length > max) {
        const count = min === max ? `${min}` : `${min}\u2013${max}`;
        const short = national.length < min ? `${min - national.length} more digit${min - national.length === 1 ? "" : "s"} needed. ` : "";
        return `${short}${country.name} numbers have ${count} digits after ${country.dial}.`;
      }
      return;
    }
    case "postalCode":
      if (value && (value.length < 3 || value.length > 10)) return "Postal code must be 3\u201310 digits.";
      return;
  }
}

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(fields) as (keyof ContactFields)[]).forEach((key) => {
    const error = validateField(key, fields[key]);
    if (error) errors[key] = error;
  });
  return errors;
}
