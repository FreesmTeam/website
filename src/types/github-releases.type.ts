import type { GithubReleaseLinkType } from "@/types/github-release-link.type.ts";

export type GithubReleasesType = {
  "Name"     : string;
  "Downloads": Record<GithubReleaseLinkType, string>;
  "Releases"?: string;
};