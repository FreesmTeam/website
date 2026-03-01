<script setup lang="ts">
import MenuBar from "@/components/launcher/bars/MenuBar.vue";
import NewsBar from "@/components/launcher/bars/NewsBar.vue";
import InstanceBar from "@/components/launcher/instances/InstanceBar.vue";
import StatusBar from "@/components/launcher/bars/StatusBar.vue";
import { provide, readonly, ref } from "vue";
import { ApplicationName as title, LauncherContextKey } from "@/constants/application.ts";
import DeleteConfirmationModal from "@/components/launcher/modals/DeleteConfirmationModal.vue";
import { UAParser } from "ua-parser-js";
import { getPlatformName } from "@/lib/helpers/get-platform-name.ts";
import WindowsHeader from "@/components/launcher/headers/WindowsHeader.vue";
import MacHeader from "@/components/launcher/headers/MacHeader.vue";
import LinuxHeader from "@/components/launcher/headers/LinuxHeader.vue";
import type { ContextLauncherType } from "@/types/context-launcher.type.ts";
import GameModal from "@/components/launcher/modals/GameModal.vue";
import DesktopWrapper from "@/components/launcher/desktop/DesktopWrapper.vue";
import { useCurrentInstance } from "@/lib/stores/launcher/current-instance.ts";
import { EaglerCraftID, EaglerCraftNewestID, EaglerCraftNewID } from "@/constants/launcher.ts";

const { os } = UAParser(navigator.userAgent);
const platform = getPlatformName(os?.name);

const maximized = ref<boolean>(false);
const minimized = ref<boolean>(false);
const barStates = ref<{
  "news"    : boolean;
  "instance": boolean;
  "status"  : boolean;
}>({
  "news"    : true,
  "instance": true,
  "status"  : true,
});

const currentInstanceStore = useCurrentInstance();

function maximize() {
  maximized.value = !maximized.value;
}
function minimize() {
  minimized.value = true;

  // Leave instance launched only if it has its modal
  switch (currentInstanceStore.launched) {
    case EaglerCraftID:
    case EaglerCraftNewID:
    case EaglerCraftNewestID: {
      break;
    }
    default: {
      currentInstanceStore.setLaunched(undefined);

      break;
    }
  }
}
function unMinimize() {
  minimized.value = false;
}

provide<ContextLauncherType>(LauncherContextKey, {
  "maximized": readonly(maximized),
  "close"    : minimize,
  title,
  maximize,
  minimize,
});
</script>

<template>
  <Teleport to="body" :disabled="!maximized">
    <div
      @contextmenu.prevent
      :class="[
        'w-full rounded-md drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] box-border',
        'border-2 border-transparent transition duration-300',
        maximized
          ? '!w-auto fixed top-4 bottom-4 left-4 right-4 z-[6000] select-none'
          : 'relative',
      ]"
    >
      <KeepAlive>
        <DesktopWrapper v-if="minimized" :open="unMinimize" />
      </KeepAlive>
      <div :class="['flex flex-col gap-0', minimized && 'invisible', maximized && 'h-full']">
        <WindowsHeader :context-key="LauncherContextKey" v-if="platform === 'Windows'" />
        <MacHeader :context-key="LauncherContextKey" v-else-if="platform === 'macOS'" />
        <LinuxHeader :context-key="LauncherContextKey" v-else />
        <div :class="['w-full flex flex-col gap-0', maximized && 'h-full']">
          <MenuBar
            :bar-states="barStates"
            :toggle-news="() => barStates.news = !barStates.news"
            :toggle-instance="() => barStates.instance = !barStates.instance"
            :toggle-status="() => barStates.status = !barStates.status"
          />
          <NewsBar v-if="barStates.news" />
          <InstanceBar :barStates="barStates" />
          <StatusBar v-if="barStates.status" />
        </div>
      </div>
      <DeleteConfirmationModal />
      <GameModal />
    </div>
  </Teleport>
</template>