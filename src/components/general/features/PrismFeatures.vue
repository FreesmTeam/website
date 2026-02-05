<script setup lang="ts">
import Image from "@/components/base/Image.vue";
</script>

<template>
  <div class="relative w-full flex flex-1 overflow-hidden rounded-md px-4 lg:w-auto">
    <Image
      class-names="absolute left-0 right-0 top-0 aspect-[3/1] w-full rounded-md object-cover"
      src="https://prismlauncher.org/img/background/prism-backgroundDark.svg"
      alt="Prism Launcher's banner"
    />
    <div class="aspect-[3/1] w-full" />
  </div>
</template>