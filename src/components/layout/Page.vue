<script setup lang="ts">
import { useSwipe } from "@vueuse/core";
import { ref, computed, useTemplateRef, watchEffect, inject, watch } from "vue";
import { useRoute, useRouter } from "@kitbag/router";
import { Redirects, Routes } from "@/constants/routes.ts";
import Footer from "@/components/layout/Footer.vue";
import { PageWrapperContextKey } from "@/constants/application.ts";
import { useMobileSwipes } from "@/lib/stores/misc/mobile-swipes.ts";

const lockScroll = inject<(state: boolean) => void>(PageWrapperContextKey);

const currentRoute = useRoute();
const router = useRouter();

const mobileSwipesStore = useMobileSwipes();

const element = useTemplateRef<EventTarget>("element");

const swipingLimit = 32;
const { isSwiping, direction, lengthX } = useSwipe(element, {
  "threshold": 0,
});

const isReallySwiping = ref<boolean>(false);

watch(isSwiping, (state: boolean) => {
  const isSwipingToX: boolean = state &&
    (direction.value === "left" || direction.value === "right") &&
    mobileSwipesStore.enabled;

  isReallySwiping.value = isSwipingToX;
  lockScroll?.(isSwipingToX);
});

const swipedDistance = computed<number>(() => Math.min(
  Math.abs(lengthX.value),
  swipingLimit,
));
const shouldNavigate = computed<boolean>(
  () => isReallySwiping.value && swipedDistance.value === swipingLimit,
);
const redirectedRecently = ref<boolean>(false);

watchEffect(() => {
  if (!shouldNavigate.value || redirectedRecently.value) {
    return;
  }

  const currentHref: string = currentRoute?.matched?.path;
  const possibleHrefs: Array<typeof Routes[keyof typeof Routes]["Path"]>
    = ["/", "/downloads", "/faq", "/themes"];
  let isOk = false;

  for (const possibleHref of possibleHrefs) {
    if (currentHref === possibleHref) {
      isOk = true;
    }
  }

  if (!isOk) {
    return;
  }

  // assure typescript that everything is ok
  const validHref = currentHref as typeof Routes[keyof typeof Routes]["Path"];

  router.push(
    Redirects[direction.value === "left" ? "left" : "right"][validHref],
  );
  redirectedRecently.value = true;
  lockScroll?.(false);

  // something like a throttling
  const timeout = setTimeout(() => {
    redirectedRecently.value = false;
  }, 100);

  return () => clearTimeout(timeout);
});
</script>

<template>
  <div
    ref="element"
    class="absolute z-5 h-fit max-w-320 w-full translate-x-0 transition-[opacity,transform] duration-50 ease-linear"
    :style="isReallySwiping ? {
      transform: `translateX(${
        direction === 'right'
          ? Math.min(swipedDistance / 2, swipingLimit)
          : Math.max(swipedDistance * -1 / 2, -1 * swipingLimit)
      }px)`,
      opacity: `${Math.max(10 / swipedDistance - 0.2, 0)}`,
    } : {}"
  >
    <div class="relative z-5 bg-catppuccin-950 p-4">
      <slot />
    </div>
    <Footer />
    <!-- To make footer's corners round even if footer is not fully visible -->
    <div class="absolute bottom-87 left-0 z-5 h-4 w-4 bg-catppuccin-950 sm:bottom-54">
      <div class="h-4 w-4 rounded-tl-md bg-catppuccin-925" />
    </div>
    <div class="absolute bottom-87 right-0 z-5 h-4 w-4 bg-catppuccin-950 sm:bottom-54">
      <div class="h-4 w-4 rounded-tr-md bg-catppuccin-925" />
    </div>
  </div>
</template>
