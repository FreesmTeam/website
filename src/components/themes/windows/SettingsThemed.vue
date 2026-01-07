<script setup lang="ts">
import Image from "@/components/base/Image.vue";
import { useCatPackState } from "@/lib/stores/launcher/cat-pack-state.ts";

const {
  highlight,
  highlightText,
  background,
  buttonColor,
  text,
  backgroundText,
  base,
  tabWidgetPane,
  tabBackground,
  tabBorderless,
  tabPadding,
  tabGap,
} = defineProps<{
  "highlight"     : string;
  "highlightText" : string;
  "background"    : string;
  "buttonColor"   : string;
  "text"          : string;
  "backgroundText": string;
  "base"          : string;
  "tabWidgetPane" : boolean;
  "tabBackground" : false | string;
  "tabBorderless" : boolean;
  "tabPadding"    : false | number;
  "tabGap"        : false | number;
}>();

const catPackStore = useCatPackState();

const buttons = [
  { "name": "Launcher", "icon": "special" },
  { "name": "Minecraft", "icon": "i-lucide-box" },
  { "name": "Java", "icon": "i-lucide-coffee" },
  { "name": "Language", "icon": "i-lucide-languages" },
  { "name": "Custom Commands", "icon": "i-lucide-square-terminal" },
  { "name": "Environment Variables", "icon": "i-lucide-code" },
  { "name": "Proxy", "icon": "i-lucide-earth-lock" },
  { "name": "External Tools", "icon": "i-lucide-wrench" },
  { "name": "Accounts", "icon": "i-lucide-users" },
  { "name": "APIs", "icon": "i-lucide-folder" },
];
const itemsThemesSettings = [
  { "name": "Icons", "input": "Lucide (White)" },
  { "name": "Widgets", "input": "Custom" },
  // users will be able to change cat packs only from the home page, so no need for reactivity
  { "name": "Cat", "input": catPackStore.name },
];
</script>

<template>
  <div
    class="h-fit min-w-56 w-full flex flex-wrap border border-[#7a7a7a] sm:flex-nowrap"
    :style="{ background: base }"
  >
    <div
      class="h-fit w-full flex flex-col sm:h-full sm:w-fit sm:shrink-0"
      :style="{ background: base }"
    >
      <div
        v-for="button in buttons"
        :key="button.name"
        class="flex flex-nowrap items-center gap-2 p-1"
        :style="{
          background: button.icon === 'special' ? highlight : 'transparent',
          color     : button.icon === 'special' ? highlightText : text,
        }"
      >
        <Image
          class-names="size-6"
          v-if="button.icon === 'special'"
          src="/favicon.webp"
          alt="Freesm Launcher logo"
        />
        <div v-else :class="[button.icon, 'shrink-0 size-6']" />
        <p class="text-sm">
          {{ button.name }}
        </p>
      </div>
    </div>
    <div
      class="h-fit w-full flex flex-col gap-2 p-2 sm:h-full"
      :style="{ background: background }"
    >
      <div class="flex flex-nowrap items-center justify-between">
        <p
          class="pl-2 font-bold leading-none"
          :style="{ color: backgroundText }"
        >
          Launcher
        </p>
        <Image class-names="size-6" src="/favicon.webp" alt="Freesm Launcher logo" />
      </div>
      <div class="h-full w-full flex flex-col">
        <div
          :class="[
            'flex flex-nowrap items-end',
            tabBorderless ? 'px-2' : 'px-[2px]',
          ]"
        >
          <div
            v-for="name in ['Features', 'User Interface', 'Console']"
            :key="name"
            :class="[
              'shrink-0 text-sm leading-none text-xs',
              name === 'User Interface' && !tabBorderless
                ? 'border-x-2 border-t-2'
                : 'border-b-2 opacity-80',
            ]"
            :style="{
              background  : tabBorderless
                ? tabBackground || 'transparent'
                : buttonColor,
              borderColor : tabBorderless ? 'transparent' : background,
              borderRadius: tabBorderless ? 0 : '2px 2px 0 0',
              color       : backgroundText,
              marginRight : `${tabGap}px` || 0,
              padding     : tabBorderless
                ? `${tabPadding}px` || 0
                : '8px',
              height: tabBorderless
                ? 'auto'
                : name === 'User Interface'
                  ? '32px'
                  : '30px',
            }"
          >
            {{ name }}
          </div>
        </div>
        <div
          class="h-full w-full flex flex-col border-x-2 border-b-2 rounded-sm p-2"
          :style="{
            background : tabWidgetPane ? 'transparent' : buttonColor,
            borderColor: tabWidgetPane ? 'transparent' : base,
          }"
        >
          <p
            class="text-xs"
            :style="{ color: backgroundText }"
          >
            Instance view sorting mode
          </p>
          <div
            class="grid cols-1 gap-1 border rounded-sm px-2 py-3 sm:cols-2 border-[theme(colors.white/.1)]"
          >
            <div
              v-for="item in ['By last launched', 'By name']"
              :key="item"
              class="flex flex-nowrap items-center gap-1"
              :style="{ color: backgroundText }"
            >
              <div v-if="item === 'By last launched'" class="size-4 rounded-full bg-black" />
              <div v-else class="grid size-4 place-items-center rounded-full bg-black">
                <div class="size-2 rounded-full bg-white" />
              </div>
              <p class="text-xs">
                {{ item }}
              </p>
            </div>
          </div>
          <p
            class="pt-2 text-xs"
            :style="{ color: backgroundText }"
          >
            Theme
          </p>
          <div
            class="flex flex-col gap-1 border rounded-sm px-2 py-3 sm:cols-2 border-[theme(colors.white/.1)]"
          >
            <div
              v-for="item in itemsThemesSettings"
              :key="item.name"
              class="flex flex-nowrap items-center gap-2"
            >
              <p
                class="w-11 shrink-0 text-xs"
                :style="{ color: backgroundText }"
              >
                {{ item.name }}
              </p>
              <div
                class="w-full border rounded-md p-1 text-xs leading-none brightness-85"
                :style="{
                  background : buttonColor,
                  borderColor: background,
                  color      : backgroundText,
                }"
              >
                {{ item.input }}
              </div>
              <div
                class="i-lucide-folder size-4 shrink-0"
                :style="{ color: backgroundText }"
              />
            </div>
          </div>
          <p
            class="pt-2 text-xs"
            :style="{ color: backgroundText }"
          >
            Cat
          </p>
          <div
            class="border rounded-sm px-2 py-2 sm:cols-2 border-[theme(colors.white/.1)]"
          >
            <div class="flex flex-nowrap items-center justify-between">
              <p
                class="text-xs"
                :style="{ color: backgroundText }"
              >
                Opacity
              </p>
              <div
                class="h-5 flex flex-nowrap rounded-md"
                :style="{
                  background: base,
                }"
              >
                <p
                  class="p-1 text-xs leading-none"
                  :style="{ color: backgroundText }"
                >
                  100%
                </p>
                <div
                  class="h-full w-4 flex flex-col items-center justify-center rounded-md"
                  :style="{
                    background: background,
                    color     : backgroundText,
                  }"
                >
                  <div class="i-fluent-caret-up-16-filled size-2" />
                  <div class="i-fluent-caret-down-16-filled size-2" />
                </div>
              </div>
            </div>
          </div>
          <p
            class="pt-2 text-xs"
            :style="{ color: backgroundText }"
          >
            Tools
          </p>
          <div
            class="border rounded-sm px-2 py-3 sm:cols-2 border-[theme(colors.white/.1)]"
          >
            <div class="flex flex-nowrap items-center gap-1">
              <div class="size-4 bg-black" />
              <p
                class="text-xs"
                :style="{ color: backgroundText }"
              >
                Replace toolbar with menubar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
