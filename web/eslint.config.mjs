import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

/** ESLint 9 flat config. `eslint-config-next` still ships as an eslintrc
 *  preset, so FlatCompat bridges it. */
export default [
  { ignores: [".next/**", "node_modules/**", "public/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
