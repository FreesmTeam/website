import type { LocaleType } from "@/types/locale.type.ts";

/*
 * This file contains the list of supported locales and their corresponding information.
 * They are ordered based on the number of speakers worldwide, remember to follow this order when adding new locales.
 */
export const Locales = ["en", "es", "ru", "pl", "fa", "ua"] as const;
export const ExtraInfo: Record<LocaleType, {
  "Name": string;
  "Flag": string;
}> = {
  "en": {
    "Name": "English",
    "Flag": "\uD83C\uDDEC\uD83C\uDDE7",
  },
  "es": {
    "Name": "Español",
    "Flag": "\uD83C\uDDEA\uD83C\uDDF8",
  },
  "ru": {
    "Name": "Русский",
    "Flag": "\uD83C\uDDF7\uD83C\uDDFA",
  },
  "pl": {
    "Name": "Polski",
    "Flag": "\uD83C\uDDF5\uD83C\uDDF1",
  },
  "fa": {
    "Name": "فارسی",
    "Flag": "\uD83C\uDDEE\uD83C\uDDF7",
  },
  "ua": {
    "Name": "Українська",
    "Flag": "\uD83C\uDDFA\uD83C\uDDE6",
  },
};