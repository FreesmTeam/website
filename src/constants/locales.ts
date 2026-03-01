import type { LocaleType } from "@/types/locale.type.ts";

/*
 * A list of locales that have translations
 */
export const Locales = [
  // These three locales should stay in this ordering
  "en",
  "ru",
  "ua",
  // The ordering of the next locales is based on the number of speakers worldwide
  "es",
  "pl",
  "fa",
] as const;

/*
 * An object with the necessary information about locales (for pre-fetching)
 */
export const ExtraInfo: Record<LocaleType, {
  "Name": string;
  "Flag": string;
}> = {
  "en": {
    "Name": "English",
    "Flag": "\uD83C\uDDEC\uD83C\uDDE7",
  },
  "ru": {
    "Name": "Русский",
    "Flag": "\uD83C\uDDF7\uD83C\uDDFA",
  },
  "ua": {
    "Name": "Українська",
    "Flag": "\uD83C\uDDFA\uD83C\uDDE6",
  },
  "es": {
    "Name": "Español",
    "Flag": "\uD83C\uDDEA\uD83C\uDDF8",
  },
  "pl": {
    "Name": "Polski",
    "Flag": "\uD83C\uDDF5\uD83C\uDDF1",
  },
  "fa": {
    "Name": "فارسی",
    "Flag": "\uD83C\uDDEE\uD83C\uDDF7",
  },
};