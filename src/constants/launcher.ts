import type { TranslationsKeyType } from "@/types/translations-key.type.ts";
import type { LauncherInstanceType } from "@/types/launcher-instance.type.ts";

export const EaglerCraftID = "eagler";
export const EaglerCraftNewID = "eagler-new";
export const EaglerCraftNewestID = "eagler-newest";
export const EaglerCraftName = "EaglerCraft 1.5.2";
export const EaglerCraftNewName = "EaglerCraft 1.8.8";
export const EaglerCraftNewestName = "EaglerCraft 1.12.2";
export const Groups = {
  "None"       : "launcher.ungrouped",
  "Placeholder": "launcher.placeholder-group",
} as const;
export const Deleted = {
  "Process": "launcher.in-the-process",
  "Yes"    : "launcher.yes",
  "No"     : "launcher.no",
} as const;

export const LauncherTabs: Array<{
  "Icon"     : string;
  "Name"    ?: TranslationsKeyType;
  "Disabled"?: boolean;
}> = [
  {
    "Icon"    : "i-fluent-add-square-24-regular",
    "Name"    : "launcher.add-instance",
    "Disabled": true,
  },
  {
    "Icon"    : "i-fluent-folder-24-regular",
    "Name"    : "launcher.folders",
    "Disabled": true,
  },
  {
    "Icon"    : "i-fluent-settings-24-regular",
    "Name"    : "launcher.settings",
    "Disabled": true,
  },
  {
    "Icon"    : "i-fluent-chat-help-24-regular",
    "Name"    : "launcher.help",
    "Disabled": true,
  },
  {
    "Icon"    : "i-fluent-phone-update-24-regular",
    "Name"    : "launcher.update",
    "Disabled": true,
  },
  {
    "Icon": "i-fluent-animal-cat-24-regular",
  },
];
export const LauncherMenuBarProfiles: Array<{
  "Name"  : TranslationsKeyType;
  "Icon"? : string;
  "Image"?: string;
  "Note"? : TranslationsKeyType;
}> = [
  {
    "Name" : "users.windstone_",
    "Image": "/skins/windstone.png",
    "Note" : "launcher.maintainer",
  },
  {
    "Name" : "users.hand7s",
    "Image": "/skins/hand7s.png",
    "Note" : "launcher.maintainer",
  },
  {
    "Name" : "users.kaeeraa",
    "Image": "/skins/kaeeraa.png",
    "Note" : "launcher.maintainer",
  },
  {
    "Name" : "users.so5iso4ka",
    "Image": "/skins/so5iso4ka.png",
    "Note" : "launcher.maintainer",
  },
  {
    "Name" : "launcher.no-default-account",
    "Image": "/skins/monochrome_steve.png",
    "Note" : "launcher.profile-hotkey",
  },
  {
    "Name": "launcher.manage-accounts",
    "Icon": "i-fluent-people-16-regular",
  },
];
export const LauncherInstances: Array<LauncherInstanceType> = [
  {
    "Id"     : EaglerCraftID,
    "Name"   : EaglerCraftName,
    "Version": "1.5.2",
    "Group"  : Groups.None,
    "Icon"   : "/assets/grass.svg",
    "Deleted": Deleted.No,
  },
  {
    "Id"     : EaglerCraftNewID,
    "Name"   : EaglerCraftNewName,
    "Version": "1.8.8",
    "Group"  : Groups.None,
    "Icon"   : "/assets/eagler-craft-logo.webp",
    "Deleted": Deleted.No,
  },
  {
    "Id"     : EaglerCraftNewestID,
    "Name"   : EaglerCraftNewestName,
    "Version": "1.12.2",
    "Group"  : Groups.None,
    "Icon"   : "/assets/diamond.svg",
    "Deleted": Deleted.No,
  },
  {
    "Id"     : "new",
    "Name"   : "1.21",
    "Version": "1.21",
    "Group"  : Groups.Placeholder,
    "Icon"   : "/assets/grass.svg",
    "Deleted": Deleted.No,
  },
  {
    "Id"     : "old",
    "Name"   : "1.12.2",
    "Version": "1.12.2",
    "Group"  : Groups.Placeholder,
    "Icon"   : "/assets/stone.svg",
    "Deleted": Deleted.No,
  },
  {
    "Id"     : "modpack",
    "Name"   : "Some 1.16.5 modpack with a long name",
    "Version": "1.16.5",
    "Group"  : Groups.Placeholder,
    "Icon"   : "/assets/diamond.svg",
    "Deleted": Deleted.No,
  },
];
export const UnknownInstance = {
  "Id"     : "unknown",
  "Name"   : "Unknown",
  "Version": "unknown",
  "Group"  : Groups.None,
  "Icon"   : "/assets/grass.svg",
  "Deleted": Deleted.No,
} as const;

/*
 * Array<{
 *  "Name": TranslationsType;
 *  "Icon": string;
 * }>
 */
export const LauncherInstanceBarItems = [
  {
    "Name": "launcher.launch",
    "Icon": "i-fluent-triangle-right-16-regular",
  },
  {
    "Name": "launcher.kill",
    "Icon": "i-fluent-dismiss-circle-16-regular",
  },
  {
    "Name": "launcher.edit",
    "Icon": "i-fluent-settings-16-regular",
  },
  {
    "Name": "launcher.change-group",
    "Icon": "i-fluent-tag-16-regular",
  },
  {
    "Name": "launcher.folder",
    "Icon": "i-fluent-folder-16-regular",
  },
  {
    "Name": "launcher.export",
    "Icon": "i-fluent-folder-arrow-right-16-regular",
  },
  {
    "Name": "launcher.copy",
    "Icon": "i-fluent-copy-arrow-right-16-regular",
  },
  {
    "Name": "launcher.delete",
    "Icon": "i-fluent-delete-16-regular",
  },
  {
    "Name": "launcher.create-shortcut",
    "Icon": "i-fluent-link-16-regular",
  },
] as const;

/*
 * Array<{
 *  "Name": TranslationsType;
 *  "Icon": string | undefined;
 * }>
 */
export const LauncherInstanceContextMenuItems = [
  {
    "Name": "launcher.rename",
    "Icon": "i-fluent-edit-16-regular",
  },
  {
    "Name": "launcher.change-icon",
    "Icon": undefined,
  },
  ...LauncherInstanceBarItems,
] as const;
export const LauncherCatPacks: Array<{
  "Name" : string;
  "Image": string;
}> = [
  {
    "Name" : "MiSide (AIHASTO)",
    "Image": "/assets/miside.webp",
  },
  {
    "Name" : "Ame-chan (WSS Playground)",
    "Image": "/assets/ame-chan-low-opacity.webp",
  },
  {
    "Name" : "Kita-chan (CloverWorks)",
    "Image": "/assets/kita-chan.webp",
  },
  {
    "Name" : "Plasma 6 (KDE e.V.)",
    "Image": "/assets/plasma-6-low-opacity.webp",
  },
  {
    "Name" : "Minecraft",
    "Image": "/assets/banner-low-opacity.webp",
  },
  {
    "Name" : "Minecraft (Winter)",
    "Image": "/assets/a-mod-pack-by-our-chat-member.webp",
  },
];