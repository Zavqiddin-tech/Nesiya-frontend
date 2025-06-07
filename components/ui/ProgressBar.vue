<template>
  <div
    class="w-full flex justify-center mt-10 px-5 py-8 rounded-2xl bg-gray-800  shadow-lg shadow-gray-700 lg:w-auto lg:inline-block light:bg-gray-50 light:shadow-black/20"
  >
    <div class="progress">
      <div class="pb-3 text-sm font-light light:text-black">To'lov</div>
      <div class="barOverflow">
        <div class="bar" :style="{ transform: rotation }"></div>
      </div>
      <span v-if="displayValue >= 0" class="text-xl font-medium"
        >{{ displayValue }} %</span
      >
      <span v-else class="text-xl font-medium"
        >0 %</span
      >
      <div class="pt-2 text-sm font-light light:text-black">qarzdorlik to'landi</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const props = defineProps<{
  progress: number;
  duration?: number; // optional, milliseconds
}>();

const displayValue = ref(0);
const rotation = ref("rotate(45deg)"); // 0% starts at 45deg

const animateProgress = () => {
  const start = performance.now();
  const from = 0;
  const to = props.progress;
  const duration = props.duration ?? 3000;

  const step = (timestamp: number) => {
    const elapsed = timestamp - start;
    const progressRatio = Math.min(elapsed / duration, 1);
    const current = from + (to - from) * progressRatio;

    displayValue.value = Math.floor(current);
    rotation.value = `rotate(${45 + current * 1.8}deg)`;

    console.log(displayValue.value);
    if (progressRatio < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

onMounted(() => {
  animateProgress();
});

watch(
  () => props.progress,
  () => {
    animateProgress();
  }
);
</script>

<style scoped>
.progress {
  position: relative;
  margin: 4px;
  text-align: center;
  width: 150px;
}
.barOverflow {
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 75px;
  margin-bottom: -28px;
}
.bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 8px solid #eee;
  border-bottom-color: #bbf451;
  border-right-color: #bbf451;
  transition: transform 0.1s linear;
}
</style>
