<script setup lang="ts">
</script>

<template>
  <div class="w-full flex flex-1 flex-nowrap gap-4 rounded-md bg-catppuccin-900 p-4 lg:w-auto">
    <div class="w-full flex flex-col gap-0">
      <div class="flex flex-wrap justify-between gap-2 bg-[#1c1c26]">
        <p class="select-text p-1 max-sm:text-sm">Username</p>
        <p class="min-w-14 select-text p-1 max-sm:text-sm">Type</p>
      </div>
      <button
        v-for="account in [
          { 'user': 'windstone_', 'type': 'MSA' },
          { 'user': 'TUYU', 'type': 'Offline' },
          { 'user': 'Roxy Migurdia (Studio Bind)', 'type': 'Ely.by' },
        ]"
        :key="account.user"
        class="group flex flex-wrap justify-between gap-2"
      >
        <span class="flex flex-nowrap items-center gap-4 p-1">
          <span class="h-4 min-w-4 flex border border-[#606060] rounded-md sm:h-[18px] sm:min-w-[18px] group-focus:border-transparent">
            <span class="animated-accent-background hidden h-full w-full rounded-md transition-[background-color] duration-2000 ease-linear group-focus:block" />
          </span>
          <span class="block leading-none max-sm:text-sm">{{ account.user }}</span>
        </span>
        <span class="block min-w-14 p-1 text-start max-sm:text-sm">{{ account.type }}</span>
      </button>
    </div>
    <div class="w-36 flex flex-col gap-2">
      <p
        v-for="option in ['Microsoft', 'Offline', 'Ely.by', 'Custom']"
        :key="option"
        class="w-full cursor-not-allowed select-text text-center text-catppuccin-50 max-sm:text-sm"
      >
        Add {{ option }}
      </p>
    </div>
  </div>
</template>