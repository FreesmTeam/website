<script setup lang="ts">
import Image from "@/components/base/Image.vue";
import { TeamSocials } from "@/constants/routes.ts";
import { inject } from "vue";
import type { TranslationsReferenceType } from "@/types/translations-reference.type.ts";
import { TranslationsContextKey } from "@/constants/application.ts";

const translations = inject<TranslationsReferenceType>(TranslationsContextKey);
</script>

<template>
  <div class="mx-auto my-12 max-w-240 px-4">
    <div class="w-full flex flex-col gap-4 rounded-md">
      <p class="select-text py-2 text-xl text-white font-semibold sm:text-3xl">
        {{ translations?.Messages?.[TeamSocials.Maintainers.Key] }}
      </p>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="member of TeamSocials.Maintainers.List"
          :key="member.Name"
          :href="member.Link"
          class="w-full rounded-md bg-catppuccin-900 p-4 transition-[background-color] lg:max-w-114 hover:bg-catppuccin-800"
        >
          <Image
            class-names="h-18 w-18 mr-4 float-left rounded-md sm:h-20 sm:w-20"
            :src="member.Image"
            :alt="`${member.Name}'s profile picture`"
          />
          <div>
            <span class="mr-2 select-text break-all align-middle text-lg font-semibold sm:text-xl">
              {{ member.Name }}
            </span>
            <span class="inline-block w-fit select-text rounded-md bg-catppuccin-800 px-2 py-1 align-middle text-xs text-catppuccin-50 leading-none sm:text-sm">
              {{ member.Badge }}
            </span >
          </div>
          <p class="text-right-to-left select-text pt-2 text-sm text-gray-300">
            {{ translations?.Messages?.[member.Description] }}
          </p>
        </a>
      </div>
      <p class="select-text py-2 text-xl text-white font-semibold sm:text-3xl">
        {{ translations?.Messages?.[TeamSocials.Contributors.Key] }}
      </p>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="contributor in TeamSocials.Contributors.List"
          :key="contributor.Link"
          :href="contributor.Link"
          class="transition-[filter] hover:brightness-70"
        >
          <Image
            class-names="h-12 w-12 rounded-md"
            :src="contributor.Image"
            alt="A contributor's profile picture"
          />
        </a>
      </div>
      <p class="select-text py-2 text-xl text-white font-semibold sm:text-3xl">
        {{ translations?.Messages?.[TeamSocials.Special.Key] }}
      </p>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="entry in TeamSocials.Special.Entries"
          :key="entry.Link"
          :href="entry.Link"
          class="w-fit flex items-center transition-[filter] hover:brightness-70"
        >
          <Image
            :src="entry.Image"
            :alt="`${entry.Label}'s logo`"
            :style="{ height: `${entry.Height}px` }"
          />
        </a>
      </div>
    </div>
  </div>
</template>