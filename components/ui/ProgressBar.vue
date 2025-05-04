<template>
  <div class="relative w-[120px] h-[120px]">
    <svg class="transform -rotate-90" width="120" height="120">
      <circle
        class="text-gray-300"
        stroke-width="10"
        stroke="currentColor"
        fill="transparent"
        r="52"
        cx="60"
        cy="60"
      />
      <circle
        class="text-blue-500"
        stroke-width="10"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
        stroke="currentColor"
        fill="transparent"
        r="52"
        cx="60"
        cy="60"
      />
    </svg>
    <div class="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-500">
      {{ percent }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  progress: number
}>()

const radius = 52
const circumference = 2 * Math.PI * radius

const offset = ref(circumference)

const progress = ref(props.progress)

const percent = ref(0)

onMounted(() => {
  const intervalId = setInterval(() => {
    if (percent.value < props.progress) {
      percent.value++ 
      offset.value = circumference - (percent.value / 100) * circumference 
    } else {
      clearInterval(intervalId) 
    }
  }, 15) 
})
</script>

<style scoped>
svg circle {
  transition: stroke-dashoffset 0.35s ease;
  transform: rotate(0.25turn);
  transform-origin: center;
}
</style>
