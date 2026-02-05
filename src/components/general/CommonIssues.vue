<script setup lang="ts">
import { FreesmIssues, TranslationsContextKey } from "@/constants/application.ts";
import { inject, onMounted, ref } from "vue";
import Image from "@/components/base/Image.vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);

const maximized = ref<{
  "Link": string;
  "Text": string;
} | undefined>(undefined);

function extractID(input: string): string {
  // 'pages.faq.issues.{issue}.title'
  const parts: Array<string> = input.split(".");

  // remove the 'title' part
  parts.pop();

  // return the '{issue}' part
  return parts.pop() ?? "unknown";
}

function scrollIntoSection(hash?: string): void {
  const issueHash: string = hash ?? location.hash;

  if (issueHash === "") {
    return;
  }

  const scrollElement: HTMLAnchorElement | null = document.querySelector(issueHash);

  if (scrollElement === null) {
    return;
  }

  document
    .getElementById("__scroll-target__workaround")
    ?.scrollTo?.({
      "top": scrollElement.offsetTop,
    });
}

onMounted(scrollIntoSection);
</script>

<template>
  <div class="mx-auto my-12 max-w-240 flex flex-col gap-4 px-4">
    <template v-for="issue in FreesmIssues" :key="issue.Name">
      <a
        :id="extractID(issue.Name)"
        :href="`#${extractID(issue.Name)}`"
        class="relative select-text text-xl text-white font-semibold before:absolute sm:text-3xl before:text-gray-300 before:opacity-0 before:transition-[opacity] before:content-['#'] before:-left-8 hover:before:opacity-100"
      >
        {{ translations?.Messages?.[issue.Name] }}
      </a>
      <div
        v-if="issue.Images.length > 0"
        class="grid cols-1 gap-4 sm:cols-2"
      >
        <Image
          @click="maximized = image"
          v-for="image in issue.Images"
          :key="image.Text"
          :src="image.Link"
          :alt="image.Text"
          :style="{
            aspectRatio: image.Ratio,
          }"
          class-names="h-full object-cover rounded-md cursor-zoom-in !transition-[opacity,filter] hover:brightness-70"
        />
      </div>
      <div
        v-html="translations?.Messages?.[issue.Description]"
        class="select-text whitespace-pre-wrap pb-4 text-justify text-gray-300 sm:text-lg"
      ></div>
    </template>
    <Teleport to="body">
      <div
        @click="maximized = undefined"
        v-if="maximized !== undefined"
        class="fixed bottom-0 left-0 right-0 top-0 z-60000 flex items-center justify-center p-8 bg-[theme(colors.black/.7)]"
      >
        <Image
          class-names="select-none max-h-full cursor-zoom-out"
          :src="maximized?.Link"
          :alt="maximized?.Text"
        />
      </div>
    </Teleport>
  </div>
</template>
