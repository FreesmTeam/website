<script setup lang="ts">
import Page from "@/components/layout/Page.vue";
import { computed, inject } from "vue";
import { FallbackLauncherData, TranslationsContextKey } from "@/constants/application.ts";
import DownloadLinks from "@/components/general/DownloadLinks.vue";
import { useQuery } from "@tanstack/vue-query";
import type { GithubReleasesType } from "@/types/github-releases.type.ts";
import type { GithubReleaseLinkType } from "@/types/github-release-link.type.ts";
import { RuntimeDownloadLink } from "@/constants/routes.ts";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

document.title = "Downloads - Freesm Launcher";
document
  ?.querySelector?.("meta[name=\"description\"]")
  ?.setAttribute?.(
    "content",
    "Download Freesm Launcher for your platform for free, no ads, no viruses, no SMS" +
    ", no registration, no calls, no glowies. Or don't do it, it's up to you!",
  );

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const { data, isPending } = useQuery({
  "queryKey": ["github", "repository", "freesmlauncher"],
  "queryFn" : async (): Promise<GithubReleasesType> => {
    const response = await fetch("https://api.github.com/repos/freesmteam/freesmlauncher/releases/latest");
    const repository: unknown = await response.json();

    if (
      typeof repository !== "object" ||
      repository === null ||
      !("name" in repository) ||
      typeof repository?.name !== "string" ||
      !("assets" in repository) ||
      !Array.isArray(repository.assets)
    ) {
      return FallbackLauncherData;
    }

    const actualDownloads: Record<GithubReleaseLinkType, string> = {
      ...FallbackLauncherData.Downloads,
    };
    const artifactChecks = [
      // first argument is an object field to assign, and the second is a string to look for in artifact's name
      [RuntimeDownloadLink.FlatpakARM, "flatpak-aarch64"],
      [RuntimeDownloadLink.FlatpakX86, "flatpak-x86_64"],
      [RuntimeDownloadLink.AppImage, ".appimage"],
      [RuntimeDownloadLink.Qt5Linux, "linux-qt5"],
      [RuntimeDownloadLink.Qt6Linux, "linux-qt6"],
      [RuntimeDownloadLink.macOS, "macos-sequoia"],
      [RuntimeDownloadLink.SetupMSVCX86, "msvc-setup"],
      [RuntimeDownloadLink.SetupMinGW, "mingw-w64-setup"],
      [RuntimeDownloadLink.SetupMSVCARM, "msvc-arm64-setup"],
      [RuntimeDownloadLink.PortableMSVCX86, "msvc-portable"],
      [RuntimeDownloadLink.PortableMinGW, "mingw-w64-portable"],
      [RuntimeDownloadLink.PortableMSVCARM, "msvc-arm64-portable"],
    ] as const;

    for (const artifact of repository?.assets) {
      const artifactName: string = artifact?.name?.toLowerCase?.() ?? "";
      // artifact link should always be defined, but show a placeholder if it's not the case
      const artifactLink: string = artifact?.["browser_download_url"] ?? RuntimeDownloadLink.FlatpakARM;

      for (const [fieldToAssign, namePart] of artifactChecks) {
        if (artifactName.includes(namePart) && !artifactName.endsWith(".zsync")) {
          actualDownloads[fieldToAssign] = artifactLink;

          break;
        }
      }
    }

    return {
      "Name"     : repository?.name,
      "Downloads": actualDownloads,
    };
  },
});
const releases = computed((): GithubReleasesType => {
  if (isPending.value || data.value === undefined) {
    return {
      "Name"     : "Freesm Launcher Maple x.x.x",
      "Downloads": FallbackLauncherData.Downloads,
    };
  }

  return data.value;
});
</script>

<template>
  <Page>
    <div class="mx-auto max-w-240 flex flex-col gap-8 px-4 pt-12">
      <p class="select-text text-center text-balance text-5xl text-white font-bold sm:text-7xl">
        {{ translations?.Messages?.["pages.downloads.title"] }}
      </p>
      <p class="text-right-to-left select-text text-center text-balance text-lg text-gray-400 sm:text-2xl">
        {{ translations?.Messages?.["pages.downloads.description"]?.replace?.("%s", releases.Name) }}
      </p>
    </div>
    <DownloadLinks :data="data" :is-pending="isPending" />
  </Page>
</template>