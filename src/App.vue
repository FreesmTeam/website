<script setup lang="ts">
import Layout from "@/components/layout/Layout.vue";
import { onAfterRouteLeave, RouterView } from "@kitbag/router";
import { provide, readonly, ref, shallowRef, useTemplateRef, watchEffect } from "vue";
import {
  TranslationsKey,
  TranslationsSelectorContextKey,
  PageWrapperContextKey, TranslationsContextKey,
} from "@/constants/application.ts";
import type { TranslationsSelectorType } from "@/types/translations-selector.type.ts";
import { useIntervalFn } from "@vueuse/core";
import { useAccentAnimation } from "@/lib/stores/misc/accent-animations.ts";
import English from "@/locales/en.json";
import { shallowValidateTranslations } from "@/lib/translations/shallow-validate-translations.ts";
import type { TranslationsType } from "@/types/translations.type.ts";
import { Locales } from "@/constants/locales.ts";
import type { LocaleType } from "@/types/locale.type.ts";
import FetchTranslations from "@/components/general/FetchTranslations.vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

const scrollLocked = ref<boolean>(false);
const scrollTarget = useTemplateRef("scrollTarget");

const shouldFetchTranslations = ref<boolean>(false);

const navigatorLocale: string = navigator.language.slice(0, 2);
const storedTranslations: string | null = localStorage.getItem(TranslationsKey);
let parsedTranslations: unknown;

if (storedTranslations === null && navigatorLocale !== "en") {
  const doesUserLocaleExist = Locales
    .includes(navigatorLocale as LocaleType);

  if (doesUserLocaleExist) {
    shouldFetchTranslations.value = true;
  }
}

try {
  parsedTranslations = storedTranslations === null
    ? English
    : JSON.parse(storedTranslations);
} catch (error: unknown) {
  console.error("Couldn't parse stored translations:", error);
  parsedTranslations = English;
}

const translations = shallowRef<TranslationsType>(
  shallowValidateTranslations(parsedTranslations),
);

function selectTranslations(selected: TranslationsType): void {
  translations.value = selected;
  localStorage.setItem(TranslationsKey, JSON.stringify(selected));
}
function lockScroll(state: boolean): void {
  scrollLocked.value = state;
}

provide<(state: boolean) => void>(PageWrapperContextKey, lockScroll);
provide<TranslationsReferenceType>(TranslationsContextKey, readonly(translations));
provide<TranslationsSelectorType>(TranslationsSelectorContextKey, selectTranslations);

const accentAnimationStore = useAccentAnimation();

const colors: Record<string, string> = {
  "#cba6f7": "#89b4fa",
  "#89b4fa": "#89dceb",
  "#89dceb": "#f5c2e7",
  "#f5c2e7": "#b4befe",
  "#b4befe": "#cba6f7",
};

const { pause, resume } = useIntervalFn(() => {
  const root = document.documentElement;
  const currentColor: string = getComputedStyle(root).getPropertyValue("--animated-accent");

  root.style.setProperty("--animated-accent", colors[currentColor]);
}, 2050);

watchEffect(() => {
  if (accentAnimationStore.enabled) {
    resume();

    return;
  }

  pause();
});
watchEffect(() => {
  document.getElementById("__html-tag")?.setAttribute?.("lang", translations.value.Info.Code);

  if (translations.value.Info.RTL) {
    document.body.dataset.rtl = "yes";

    return;
  }

  delete document.body.dataset.rtl;
});

onAfterRouteLeave(() => {
  // this is so messy
  setTimeout(() => {
    scrollTarget.value?.scrollTo?.({
      "top"     : 0,
      "behavior": "smooth",
    });
  }, 150);
});
</script>

<template>
  <FetchTranslations v-if="shouldFetchTranslations" />
  <div v-show="false">
    <!-- This block contains UnoCSS classes that are not included in the bundle -->
    <span class="i-mdi-github i-mdi-telegram i-fluent-add-square-24-regular i-fluent-folder-24-regular i-fluent-settings-24-regular i-fluent-chat-help-24-regular i-fluent-phone-update-24-regular i-fluent-animal-cat-24-regular i-fluent-people-16-regular i-fluent-edit-16-regular i-fluent-triangle-right-16-regular i-fluent-dismiss-circle-16-regular i-fluent-settings-16-regular i-fluent-tag-16-regular i-fluent-folder-16-regular i-fluent-folder-arrow-right-16-regular i-fluent-copy-arrow-right-16-regular i-fluent-delete-16-regular i-fluent-link-16-regular i-simple-icons-nixos i-simple-icons-archlinux i-simple-icons-debian i-simple-icons-flatpak i-simple-icons-linux i-simple-icons-gentoo i-mdi-microsoft-windows i-simple-icons-arm i-simple-icons-apple i-lucide-bolt i-lucide-square-mouse-pointer i-lucide-text-cursor-input i-simple-icons-discord text-red-500 underline" />
  </div>
  <Layout>
    <RouterView>
      <template #default="{ component }">
        <div
          ref="scrollTarget"
          :class="[
            'relative min-h-[calc(100svh-80px)] w-full flex justify-center overflow-x-hidden',
            'scroll-gutter-stable-both scroll-smooth xle:pt-20 xle:min-h-svh',
            scrollLocked && 'overflow-y-hidden',
          ]"
        >
          <Transition name="page">
            <component :is="component" />
          </Transition>
        </div>
      </template>
    </RouterView>
  </Layout>
</template>
