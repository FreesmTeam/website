<script setup lang="ts">
import { computed, ref, shallowRef, watchEffect } from "vue";
import { CustomizationTabs, DefaultColors, DefaultCSS } from "@/constants/customization.ts";
import ColorGenerator from "@/components/themes/ColorGenerator.vue";
import GeneralStyler from "@/components/themes/GeneralStyler.vue";
import ButtonsStyler from "@/components/themes/ButtonsStyler.vue";
import LauncherThemed from "@/components/themes/windows/LauncherThemed.vue";
import SettingsThemed from "@/components/themes/windows/SettingsThemed.vue";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { transformToCss } from "@/lib/helpers/transform-to-css.ts";
import { readImportedColors } from "@/lib/helpers/read-imported-colors.ts";
import { ThemeGeneratorKeys } from "@/constants/application.ts";
import { readThemeGeneratorColors } from "@/lib/helpers/read-theme-generator-colors.ts";
import { readThemeGeneratorStyles } from "@/lib/helpers/read-theme-generator-styles.ts";
import Highlighter from "@/components/themes/code/Highlighter.vue";

const selected = ref<typeof CustomizationTabs[number]["Key"]>("colors");
const codeView = ref<boolean>(false);

const colors = ref<typeof DefaultColors>({ ...DefaultColors, ...(readThemeGeneratorColors()) });
const styles = shallowRef<typeof DefaultCSS>({ ...DefaultCSS, ...(readThemeGeneratorStyles()) });

const currentCode = computed(() => {
  const computedStyles = transformToCss({ "theme": styles.value, "highlight": colors.value.Highlight });
  const randomKey = Math.floor(Math.random() * 10_000);

  return {
    "key" : randomKey,
    "data": [
      {
        "lang" : "json",
        "title": "theme.json",
        "code" : JSON.stringify({
          "colors": {
            ...colors.value,
            "fadeAmount": 0.5,
            "fadeColor" : "#000000",
          },
          "name"   : `A Custom Theme <${randomKey}>`,
          "widgets": "Fusion",
        }, null, 2),
      },
      {
        "lang" : "css",
        "title": "themeStyle.css",
        "code" : computedStyles.changed ? computedStyles.result : "/* You didn't change any CSS styles */",
      },
    ],
  };
});

function selectColor({
  key,
  color,
}: {
  "key"  : keyof typeof DefaultColors;
  "color": typeof DefaultColors[keyof typeof DefaultColors];
}) {
  colors.value[key] = color;
}
function resetColors() {
  if (!confirm("Are you sure about resetting current colors?")) {
    return;
  }

  colors.value = { ...DefaultColors };
}
function resetStyles() {
  if (!confirm("Are you sure about resetting all CSS styles (not colors)?")) {
    return;
  }

  styles.value = { ...DefaultCSS };
}

function downloadTheme() {
  const zip = new JSZip;
  const randomKey = currentCode.value.key;
  const folder = zip.folder(`customTheme${randomKey}`);

  if (!folder) {
    console.error("Couldn't create a folder for the theme zip");

    return;
  }

  folder.file("theme.json", currentCode.value.data[0].code);
  folder.file("themeStyle.css", currentCode.value.data[1].code);

  zip.generateAsync({ "type": "blob" }).then(content => {
    saveAs(content, `customTheme${randomKey}.zip`);
  });
}
function toggleCodeView() {
  codeView.value = !codeView.value;
}
async function handleImport(event: Event) {
  const importedColors = await readImportedColors({ event });

  if (importedColors === 0) {
    return;
  }

  if ("fadeAmount" in importedColors) {
    delete importedColors["fadeAmount"];
  }

  if ("fadeColor" in importedColors) {
    delete importedColors["fadeColor"];
  }

  colors.value = {
    ...colors.value,
    ...importedColors,
  };
}

function modifyStyles(newStyles: typeof DefaultCSS) {
  styles.value = newStyles;
}

watchEffect(() => {
  localStorage.setItem(ThemeGeneratorKeys.Colors, JSON.stringify(colors.value));
  localStorage.setItem(ThemeGeneratorKeys.Styles, JSON.stringify(styles.value));
});
</script>

<template>
  <div class="mx-auto my-12 max-w-240 flex flex-col gap-4 px-4">
    <div
      class="relative w-full flex flex-wrap gap-0 overflow-x-auto rounded-md bg-catppuccin-900 sm:flex-nowrap"
    >
      <div class="flex shrink-0 gap-0 sm:flex-col">
        <button
          @click="selected = tab.Key"
          v-for="tab in CustomizationTabs"
          :key="tab.Key"
          :aria-label="tab.Name"
          :title="tab.Name"
          class="group px-4 py-2 first:pt-4"
        >
          <span
            :class="[
              'grid size-10 place-items-center rounded-md transition-[background-color]',
              'group-hover:bg-catppuccin-800',
              selected === tab.Key
                ? 'bg-catppuccin-800'
                : 'bg-catppuccin-900',
            ]"
          >
            <span :class="['block size-6', tab.Icon]" />
          </span>
        </button>
      </div>
      <div class="w-full flex flex-col gap-4 py-4 pl-4 pr-4 sm:pl-0">
        <div class="flex flex-wrap gap-4">
          <button
            v-for="item in [
              { 'name': 'Download', 'icon': 'i-lucide-download', 'action': downloadTheme },
              { 'name': 'Show JSON & CSS', 'icon': 'i-lucide-braces', 'action': toggleCodeView },
            ]"
            :key="item.name"
            @click="item.action"
            class="w-fit flex flex-nowrap items-center gap-4 rounded-md p-2 transition-[background-color] hover:bg-catppuccin-800"
          >
            <span :class="[item.icon, 'block size-6']" />
            <span class="block text-white font-medium">
              {{ item.name }}
            </span>
          </button>
          <label for="import-colors" class="w-fit flex flex-nowrap cursor-pointer items-center gap-4 rounded-md p-2 transition-[background-color] hover:bg-catppuccin-800">
            <span class="i-lucide-paintbrush block size-6" />
            <span class="block text-white font-medium">
              Import Colors
            </span>
          </label>
          <input
            id="import-colors"
            type="file"
            accept="application/json"
            @change="handleImport"
            class="hidden"
          />
        </div>
        <Highlighter v-if="codeView" :code="currentCode" />
        <ColorGenerator
          v-if="selected === 'colors'"
          :colors="colors"
          :set-color="selectColor"
          :reset-colors="resetColors"
        />
        <GeneralStyler
          v-else-if="selected === 'general'"
          :styles="styles"
          :modify-styles="modifyStyles"
          :reset-styles="resetStyles"
        />
        <ButtonsStyler
          v-else
          :styles="styles"
          :background="colors.Window"
          :modify-styles="modifyStyles"
          :reset-styles="resetStyles"
          :highlight="colors.Highlight"
        />
        <LauncherThemed
          :highlight="colors.Highlight"
          :highlighted-text="colors.HighlightedText"
          :button-text="colors.ButtonText"
          :background="colors.Window"
          :background-text="colors.WindowText"
          :text="colors.Text"
          :base="colors.Base"
          :tooltip-base="colors.ToolTipBase"
          :tooltip-text="colors.ToolTipText"
          :borderless="styles.LayoutBorder"
          :handlers="styles['QObject::handle']"
          :button-borderless="styles['QToolButton'].border"
          :button-padding="styles['QToolButton'].padding"
          :button-background="styles['QToolButton:pressed']['background-color']"
        />
        <SettingsThemed
          :highlight="colors.Highlight"
          :highlight-text="colors.HighlightedText"
          :background="colors.Window"
          :button-color="colors.Button"
          :background-text="colors.WindowText"
          :text="colors.Text"
          :base="colors.Base"
          :tab-widget-pane="styles['QTabWidget::pane'].border"
          :tab-background="styles['QTabBar::tab:selected']['background-color']"
          :tab-borderless="styles['QTabBar::tab'].border"
          :tab-padding="styles['QTabBar::tab'].padding"
          :tab-gap="styles['QTabBar::tab']['margin-right']"
        />
      </div>
    </div>
  </div>
</template>