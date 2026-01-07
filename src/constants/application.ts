import type { TranslationsKeyType } from "@/types/translations-key.type.ts";
import type { GithubReleasesType } from "@/types/github-releases.type.ts";

export const ApplicationName = "Freesm Launcher";

export const TranslationsContextKey = Symbol();
export const TranslationsSelectorContextKey = Symbol();
export const LauncherContextKey = Symbol();
export const LauncherModalContextKey = Symbol();
export const LauncherModalEmbedContextKey = Symbol();
export const PageWrapperContextKey = Symbol();
export const DesktopTerminalContextKey = Symbol();

export const TranslationsKey = "translations";
export const AccentAnimationKey = "accent-animation";
export const MobileSwipesKey = "mobile-swipes";
export const ThemeGeneratorKeys = {
  "Colors": "@theme-gen/colors",
  "Styles": "@theme-gen/styles",
};

export const FeaturesSection: Array<{
  "Id"         : "auth" | "customization" | "prism" | "other";
  "Title"      : TranslationsKeyType;
  "Description": TranslationsKeyType;
  "Reverse"    : boolean;
}> = [
  {
    "Id"         : "prism",
    "Title"      : "pages.home.features.prism.title",
    "Description": "pages.home.features.prism.description",
    "Reverse"    : false,
  },
  {
    "Id"         : "auth",
    "Title"      : "pages.home.features.more-auth-servers.title",
    "Description": "pages.home.features.more-auth-servers.description",
    "Reverse"    : true,
  },
  {
    "Id"         : "customization",
    "Title"      : "pages.home.features.customization.title",
    "Description": "pages.home.features.customization.description",
    "Reverse"    : false,
  },
  {
    "Id"         : "other",
    "Title"      : "pages.home.features.other.title",
    "Description": "pages.home.features.other.description",
    "Reverse"    : true,
  },
];

export const FallbackLauncherData: GithubReleasesType = {
  "Name"     : "Freesm Launcher Sequoia 1.4.2",
  "Downloads": {
    "runtime-flatpak-arm"      : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Linux-6d80511-Flatpak-aarch64.flatpak.zip",
    "runtime-flatpak-x86"      : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Linux-6d80511-Flatpak-x86_64.flatpak.zip",
    "runtime-qt5-linux"        : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Linux-Qt5-Portable-sequoia-1.4.2.tar.gz",
    "runtime-qt6-linux"        : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Linux-Qt6-Portable-sequoia-1.4.2.tar.gz",
    "runtime-app-image"        : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Linux-x86_64.AppImage",
    "runtime-macos"            : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-macOS-sequoia-1.4.2.zip",
    "runtime-setup-msvc-x86"   : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Windows-MSVC-Setup-sequoia-1.4.2.exe",
    "runtime-setup-mingw"      : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Windows-MinGW-w64-Setup-sequoia-1.4.2.exe",
    "runtime-setup-msvc-arm"   : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Windows-MSVC-arm64-Setup-sequoia-1.4.2.exe",
    "runtime-portable-msvc-x86": "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Windows-MSVC-Portable-sequoia-1.4.2.zip",
    "runtime-portable-mingw"   : "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Windows-MinGW-w64-Portable-sequoia-1.4.2.zip",
    "runtime-portable-msvc-arm": "https://github.com/FreesmTeam/FreesmLauncher/releases/download/sequoia-1.4.2/FreesmLauncher-Windows-MSVC-arm64-Portable-sequoia-1.4.2.zip",
  },
};

export const FreesmIssues: Array<{
  "Name"  : TranslationsKeyType;
  "Images": Array<{
    "Link" : string;
    "Text" : string;
    "Ratio": number;
  }>;
  "Description": TranslationsKeyType;
}> = [
  {
    "Name"  : "pages.faq.issues.long-launch.title",
    "Images": [
      {
        "Link" : "/issues/freesm-long-launch.webp",
        "Text" : "Long instance launch problem",
        "Ratio": 1009 / 626,
      },
    ],
    "Description": "pages.faq.issues.long-launch.description",
  },
  {
    "Name"  : "pages.faq.issues.no-versions-available.title",
    "Images": [
      {
        "Link" : "/issues/freesm-no-available-versions.webp",
        "Text" : "No available versions problem",
        "Ratio": 1211 / 561,
      },
    ],
    "Description": "pages.faq.issues.no-versions-available.description",
  },
  {
    "Name"  : "pages.faq.issues.portable-zip.title",
    "Images": [
      {
        "Link" : "/issues/freesm-java-checker.webp",
        "Text" : "Java checker problem",
        "Ratio": 667 / 539,
      },
    ],
    "Description": "pages.faq.issues.portable-zip.description",
  },
  {
    "Name"       : "pages.faq.issues.optifine.title",
    "Images"     : [],
    "Description": "pages.faq.issues.optifine.description",
  },
  {
    "Name"       : "pages.faq.issues.skins.title",
    "Images"     : [],
    "Description": "pages.faq.issues.skins.description",
  },
  {
    "Name"  : "pages.faq.issues.microsoft-invalid-login.title",
    "Images": [
      {
        "Link" : "/issues/freesm-not-entitled.webp",
        "Text" : "Not entitled account problem",
        "Ratio": 537 / 196,
      },
    ],
    "Description": "pages.faq.issues.microsoft-invalid-login.description",
  },
  {
    "Name"       : "pages.faq.issues.no-languages.title",
    "Images"     : [],
    "Description": "pages.faq.issues.no-languages.description",
  },
  {
    "Name"       : "pages.faq.issues.other.title",
    "Images"     : [],
    "Description": "pages.faq.issues.other.description",
  },
];
