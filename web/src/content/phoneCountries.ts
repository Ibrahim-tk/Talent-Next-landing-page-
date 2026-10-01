export type PhoneCountry = { iso: string; name: string; dial: string; flag: string; digits: [number, number] };

/* `digits` is the national number length after the dial code.
   Dial codes the phone field can detect. Detection takes the longest
   matching prefix, so +1 and +44 never shadow longer codes. */
export const phoneCountries: PhoneCountry[] = [
  { iso: "US", name: "United States", dial: "+1", flag: "🇺🇸", digits: [10, 10] },
  { iso: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰", digits: [10, 10] },
  { iso: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧", digits: [10, 10] },
  { iso: "IN", name: "India", dial: "+91", flag: "🇮🇳", digits: [10, 10] },
  { iso: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪", digits: [8, 9] },
  { iso: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦", digits: [9, 9] },
  { iso: "DE", name: "Germany", dial: "+49", flag: "🇩🇪", digits: [10, 11] },
  { iso: "FR", name: "France", dial: "+33", flag: "🇫🇷", digits: [9, 9] },
  { iso: "AU", name: "Australia", dial: "+61", flag: "🇦🇺", digits: [9, 9] },
  { iso: "CN", name: "China", dial: "+86", flag: "🇨🇳", digits: [11, 11] },
];

export function detectCountry(phone: string): PhoneCountry | undefined {
  return phoneCountries
    .filter((c) => phone.startsWith(c.dial))
    .sort((a, b) => b.dial.length - a.dial.length)[0];
}

/* Digits with one leading +. Once a country is recognised, a local trunk 0
   typed after the code is dropped (+92 0300… → +92 300…, the 11-digit local
   number 0300 1234567), and anything past that country's length is cut off. */
export function normalisePhone(raw: string): string {
  let phone = raw.replace(/(?!^\+)[^\d]/g, "");
  const country = detectCountry(phone);
  if (!country) return phone.slice(0, 16);
  let national = phone.slice(country.dial.length).replace(/^0/, "");
  national = national.slice(0, country.digits[1]);
  return country.dial + national;
}
