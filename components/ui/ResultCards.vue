<script setup lang="ts">
import { reactive, onMounted } from "vue";

import { usePayStore } from "~/stores/post/pay";
const payStore = usePayStore();
const { getTodayPay } = payStore;

const today = reactive({
  debts: 0,
});
const props = defineProps<{
  clientCount: number;
  debts: number;
}>();

onMounted(() => {
  getTodayPay().then((data) => {
    today.debts = data;
  });
});
</script>

<template>
  <div class="flex flex-wrap justify-between -ml-3 -mr-3">
    <div class="w-4/12 lg:max-w-[350px] px-3 pb-5">
      <div class="px-3 py-4 relative bg-gray-800 rounded-2xl">
        <div><UIcon name="mynaui:cart-check" class="text-3xl" /></div>
        <div class="py-1">Bugun</div>
        <div class="text-xl font-bold">
          {{ today.debts.toLocaleString() }}
          <span class="text-sm font-normal">so'm</span>
        </div>
        <div
          class="w-3 h-14 absolute right-0 bottom-9 rounded-tl-lg rounded-bl-lg bg-linear-to-b from-blue-900 to-blue-500"
        ></div>
      </div>
    </div>
    <div class="w-4/12 lg:max-w-[350px] px-3 pb-5">
      <div class="px-3 py-4 relative bg-gray-800 rounded-2xl">
        <div><UIcon name="solar:dollar-broken" class="text-3xl" /></div>
        <div class="py-1">Jami qarzdorlik</div>
        <div class="text-xl font-bold">
          {{ props.debts.toLocaleString() }}
          <span class="text-sm font-normal">so'm</span>
        </div>
        <div
          class="w-3 h-14 absolute right-0 bottom-9 rounded-tl-lg rounded-bl-lg bg-linear-to-b from-violet-900 to-violet-500"
        ></div>
      </div>
    </div>
    <div class="w-4/12 lg:max-w-[350px] px-3 pb-5">
      <div class="px-3 py-4 relative bg-gray-800 rounded-2xl">
        <div><UIcon name="majesticons:users-line" class="text-3xl" /></div>
        <div class="py-1">Mijozlar soni</div>
        <div class="text-xl font-bold">
          {{ props.clientCount.toLocaleString() }}
          <span class="text-sm font-normal">ta</span>
        </div>

        <div
          class="w-3 h-14 absolute right-0 bottom-9 rounded-tl-lg rounded-bl-lg bg-linear-to-b from-teal-700 to-teal-400"
        ></div>
      </div>
    </div>
  </div>
</template>
