import { createRoute } from "@kitbag/router";
import { defineAsyncComponent } from "vue";
import Compass from "@/components/icons/Compass.vue";
import Book from "@/components/icons/Book.vue";
import Downloading from "@/components/icons/Downloading.vue";
import Blocks from "@/components/icons/Blocks.vue";
import type { TranslationsKeyType } from "@/types/translations-key.type.ts";
import { getPlatformName } from "@/lib/helpers/get-platform-name.ts";
import type { GithubReleaseLinkType } from "@/types/github-release-link.type.ts";

export const Routes = {
  "Home": {
    "Key" : "Home",
    "Name": "routes.home.name",
    "Icon": Compass,
    "Path": "/",
  },
  "Downloads": {
    "Key" : "Downloads",
    "Name": "routes.downloads.name",
    "Icon": Downloading,
    "Path": "/downloads",
  },
  "FAQ": {
    "Key" : "FAQ",
    "Name": "routes.faq.name",
    "Icon": Book,
    "Path": "/faq",
  },
  "Themes": {
    "Key" : "Themes",
    "Name": "routes.themes.name",
    "Icon": Blocks,
    "Path": "/themes",
  },
} as const;
export const RoutesArray: Array<{
  "Key" : string;
  "Name": TranslationsKeyType;
  "Icon": typeof Routes["Home"]["Icon"];
  "Path": `/${string}`;
}> = Object.values(Routes);
export const Redirects: {
  "left": Record<
    typeof Routes[keyof typeof Routes]["Path"],
    typeof Routes[keyof typeof Routes]["Path"]
  >;
  "right": Record<
    typeof Routes[keyof typeof Routes]["Path"],
    typeof Routes[keyof typeof Routes]["Path"]
  >;
} = {
  "left": {
    "/"         : "/downloads",
    "/downloads": "/faq",
    "/faq"      : "/themes",
    "/themes"   : "/",
  },
  "right": {
    "/downloads": "/",
    "/faq"      : "/downloads",
    "/themes"   : "/faq",
    "/"         : "/themes",
  },
};
export const RoutesConfiguration = Object
  .values(Routes)
  .map(({ Key, Path }) => createRoute({
    "name"     : Key,
    "path"     : Path,
    "component": defineAsyncComponent(() => import(`@/pages/${Key}.vue`)),
  }));

export const Socials = {
  "Github": {
    "Home"      : "https://github.com/FreesmTeam/FreesmLauncher",
    "Issues"    : "https://github.com/FreesmTeam/FreesmLauncher/issues",
    "Contribute": "https://github.com/FreesmTeam/FreesmLauncher/blob/develop/CONTRIBUTING.md",
    "Website"   : "https://github.com/FreesmTeam/website",
  },
  "Discord": {
    "Group": "https://discord.com/invite/6jjw4gjy4w",
  },
  "Telegram": {
    "Group": "https://t.me/freesmteam",
    "Chat" : "https://t.me/+DL82hkeJAq9kMTMy",
  },
};
export const TeamSocials: {
  "Maintainers": {
    "Key" : TranslationsKeyType;
    "List": Array<{
      "Name"       : string;
      "Link"       : string;
      "Badge"      : string;
      "Image"      : string;
      "Description": TranslationsKeyType;
    }>;
  };
  "Contributors": {
    "Key" : TranslationsKeyType;
    "List": Array<{
      "Link" : string;
      "Image": string;
    }>;
  };
  "Special": {
    "Key"  : TranslationsKeyType;
    "Entry": {
      "Link" : string;
      "Image": string;
    };
  };
} = {
  "Maintainers": {
    "Key" : "pages.home.team.maintainers.title",
    "List": [
      {
        "Name"       : "so5iso4ka",
        "Link"       : "https://github.com/so5iso4ka/",
        "Badge"      : "main developer",
        "Image"      : "https://avatars.githubusercontent.com/u/170882094?v=4",
        "Description": "pages.home.team.maintainers.list.so5iso4ka.description",
      },
      {
        "Name"       : "kaeeraa",
        "Link"       : "https://github.com/kaeeraa/",
        "Badge"      : "master-of-all-trades",
        "Image"      : "https://avatars.githubusercontent.com/u/99148867?v=4",
        "Description": "pages.home.team.maintainers.list.kaeeraa.description",
      },
      {
        "Name"       : "s0me1newithhand7s",
        "Link"       : "https://github.com/s0me1newithhand7s",
        "Badge"      : "creator",
        "Image"      : "https://avatars.githubusercontent.com/u/117505144?v=4",
        "Description": "pages.home.team.maintainers.list.s0me1newithhand7s.description",
      },
      {
        "Name"       : "windstone",
        "Link"       : "https://github.com/notwindstone/",
        "Badge"      : "creator",
        "Image"      : "https://avatars.githubusercontent.com/u/91563727?v=4",
        "Description": "pages.home.team.maintainers.list.windstone.description",
      },
    ],
  },
  "Contributors": {
    "Key" : "pages.home.team.contributors.title",
    "List": [
      {
        "Link" : "https://github.com/m3oweezed",
        "Image": "https://avatars.githubusercontent.com/u/76707795?v=4",
      },
      {
        "Link" : "https://github.com/qEniuu/",
        "Image": "https://avatars.githubusercontent.com/u/95589434?v=4",
      },
      {
        "Link" : "https://github.com/FoxyChipher",
        "Image": "https://avatars.githubusercontent.com/u/75834304?v=4",
      },
      {
        "Link" : "https://github.com/SophrTemin/",
        "Image": "/deleted-avatar.webp",
      },
      {
        "Link" : "https://github.com/sn1pp",
        "Image": "https://avatars.githubusercontent.com/u/79652963?v=4",
      },
      {
        "Link" : "https://github.com/viceversa03",
        "Image": "https://avatars.githubusercontent.com/u/109146971?v=4",
      },
      {
        "Link" : "https://github.com/ventureoo",
        "Image": "https://avatars.githubusercontent.com/u/92667539?v=4",
      },
      {
        "Link" : "https://t.me/chaoticbraincat",
        "Image": "/brainfluid.webp",
      },
      {
        "Link" : "https://github.com/Azarakash",
        "Image": "https://avatars.githubusercontent.com/u/228034665?v=4",
      },
      {
        "Link" : "https://github.com/mqsla",
        "Image": "https://avatars.githubusercontent.com/u/85938576?v=4",
      },
      {
        "Link" : "https://github.com/HowXu",
        "Image": "https://avatars.githubusercontent.com/u/91002552?v=4",
      },
    ],
  },
  "Special": {
    "Key"  : "pages.home.team.special.title",
    "Entry": {
      "Link" : "https://elyprismlauncher.github.io/",
      "Image": "https://elyprismlauncher.github.io/assets/svg/org.prismlauncher.PrismLauncher.svg",
    },
  },
};

export const ExternalLinks = [
  {
    "Key" : "Discord",
    // Somehow this icon is not loaded by UnoCSS...
    "Icon": "i-simple-icons-discord",
    "Link": Socials.Discord.Group,
  },
  {
    "Key" : "Telegram",
    // Somehow this icon is not loaded by UnoCSS...
    "Icon": "i-mdi-telegram",
    "Link": Socials.Telegram.Group,
  },
] as const;

export const RuntimeDownloadLink = {
  "FlatpakARM"     : "runtime-flatpak-arm",
  "FlatpakX86"     : "runtime-flatpak-x86",
  "AppImage"       : "runtime-app-image",
  "Qt5Linux"       : "runtime-qt5-linux",
  "Qt6Linux"       : "runtime-qt6-linux",
  "macOS"          : "runtime-macos",
  "PortableMSVCARM": "runtime-portable-msvc-arm",
  "PortableMSVCX86": "runtime-portable-msvc-x86",
  "PortableMinGW"  : "runtime-portable-mingw",
  "SetupMSVCARM"   : "runtime-setup-msvc-arm",
  "SetupMSVCX86"   : "runtime-setup-msvc-x86",
  "SetupMinGW"     : "runtime-setup-mingw",
} as const;
export const DownloadLinks: Array<{
  "Title": ReturnType<typeof getPlatformName>;
  "Links": Array<{
    "Icon" : string;
    "Name" : string;
    "Link" : GithubReleaseLinkType | `https://${string}`;
    "Extra": string;
  }>;
}> = [
  {
    "Title": "Windows",
    "Links": [
      {
        "Icon" : "i-mdi-microsoft-windows",
        "Name" : "Setup MSVC",
        "Link" : RuntimeDownloadLink.SetupMSVCX86,
        "Extra": ".exe, x86_64",
      },
      {
        "Icon" : "i-mdi-microsoft-windows",
        "Name" : "Setup MinGW",
        "Link" : RuntimeDownloadLink.SetupMinGW,
        "Extra": ".exe, x86_64",
      },
      {
        "Icon" : "i-simple-icons-arm",
        "Name" : "Setup MSVC",
        "Link" : RuntimeDownloadLink.SetupMSVCARM,
        "Extra": ".exe, aarch64",
      },
      {
        "Icon" : "i-mdi-microsoft-windows",
        "Name" : "Portable MSVC",
        "Link" : RuntimeDownloadLink.PortableMSVCX86,
        "Extra": ".zip, x86_64",
      },
      {
        "Icon" : "i-mdi-microsoft-windows",
        "Name" : "Portable MinGW",
        "Link" : RuntimeDownloadLink.PortableMinGW,
        "Extra": ".zip, x86_64",
      },
      {
        "Icon" : "i-simple-icons-arm",
        "Name" : "Portable MSVC",
        "Link" : RuntimeDownloadLink.PortableMSVCARM,
        "Extra": ".zip, aarch64",
      },
    ],
  },
  {
    "Title": "Linux",
    "Links": [
      {
        "Icon" : "i-simple-icons-nixos",
        "Name" : "Nix",
        "Link" : "https://github.com/FreesmTeam/FreesmLauncher/blob/develop/flake.nix",
        "Extra": "Flake",
      },
      {
        "Icon" : "i-simple-icons-archlinux",
        "Name" : "Arch",
        "Link" : "https://aur.archlinux.org/packages/freesmlauncher",
        "Extra": "AUR",
      },
      {
        "Icon" : "i-simple-icons-archlinux",
        "Name" : "Arch (bin)",
        "Link" : "https://aur.archlinux.org/packages/freesmlauncher-bin",
        "Extra": "AUR",
      },
      {
        "Icon" : "i-simple-icons-debian",
        "Name" : "Debian",
        "Link" : "https://github.com/FreesmTeam/freesm-deb-pkgbuild",
        "Extra": ".deb",
      },
      {
        "Icon" : "i-simple-icons-flatpak",
        "Name" : "Flatpak",
        "Link" : RuntimeDownloadLink.FlatpakARM,
        "Extra": ".zip, aarch64",
      },
      {
        "Icon" : "i-simple-icons-flatpak",
        "Name" : "Flatpak",
        "Link" : RuntimeDownloadLink.FlatpakX86,
        "Extra": ".zip, x86_64",
      },
      {
        "Icon" : "i-simple-icons-linux",
        "Name" : "Portable Qt5",
        "Link" : RuntimeDownloadLink.Qt5Linux,
        "Extra": ".tar.gz",
      },
      {
        "Icon" : "i-simple-icons-linux",
        "Name" : "Portable Qt6",
        "Link" : RuntimeDownloadLink.Qt6Linux,
        "Extra": ".tar.gz",
      },
      {
        "Icon" : "i-simple-icons-linux",
        "Name" : "Portable",
        "Link" : RuntimeDownloadLink.AppImage,
        "Extra": ".AppImage",
      },
      {
        "Icon" : "i-simple-icons-gentoo",
        "Name" : "Gentoo",
        "Link" : "https://github.com/FreesmTeam/freesmlauncher-overlay",
        "Extra": "EBuild Overlay (archived)",
      },
    ],
  },
  {
    "Title": "macOS",
    "Links": [
      {
        "Icon" : "i-simple-icons-apple",
        "Name" : "Portable",
        "Link" : RuntimeDownloadLink.macOS,
        "Extra": ".zip",
      },
    ],
  },
];

export const FooterLinks = [
  {
    "title": "footer.about.title",
    "links": [
      {
        "name": "footer.about.link.contribute",
        "link": Socials.Github.Contribute,
      },
      {
        "name": "footer.about.link.faq",
        "link": Routes.FAQ.Path,
      },
      {
        "name": "footer.about.link.download",
        "link": Routes.Downloads.Path,
      },
    ],
  },
  {
    "title": "footer.community.title",
    "links": [
      {
        "name": "footer.community.link.telegram-channel",
        "link": Socials.Telegram.Group,
      },
      {
        "name": "footer.community.link.telegram-chat",
        "link": Socials.Telegram.Chat,
      },
      {
        "name": "footer.community.link.discord",
        "link": Socials.Discord.Group,
      },
    ],
  },
  {
    "title": "footer.project.title",
    "links": [
      {
        "name": "footer.project.source-code",
        "link": Socials.Github.Home,
      },
      {
        "name": "footer.project.github-issues",
        "link": Socials.Github.Issues,
      },
      {
        "name": "footer.project.website",
        "link": Socials.Github.Website,
      },
    ],
  },
] as const;
