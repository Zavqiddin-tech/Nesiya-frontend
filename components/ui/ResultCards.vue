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
  getTodayPay().then((data: any) => {
    today.debts = data;
  });
});
</script>

<template>
  <div class="flex flex-wrap justify-between -ml-3 -mr-3">
    <div class="w-6/12 md:w-4/12 lg:max-w-[350px] px-3 pb-5">
      <div
        class="px-3 py-4 relative bg-gray-800 rounded-2xl shadow-lg shadow-gray-700 light:bg-gray-50 light:shadow-black/20"
      >
        <div><i class="fa-solid fa-shop text-xl"></i></div>
        <div class="py-2 text-lg">Bugun</div>
        <div class="text-xl font-bold">
          {{ today.debts.toLocaleString() }}
          <span class="text-sm font-normal">so'm</span>
        </div>
        <div
          class="w-3 h-14 absolute right-0 top-1/2 transform -translate-y-1/2 rounded-tl-lg rounded-bl-lg bg-linear-to-b from-blue-900 to-blue-500 light:from-blue-700 light:to-blue-300"
        ></div>
      </div>
    </div>
    <div class="w-6/12 md:w-4/12 lg:max-w-[350px] px-3 pb-5">
      <div
        class="px-3 py-4 relative bg-gray-800 rounded-2xl shadow-lg shadow-gray-700 light:bg-gray-50 light:shadow-black/20"
      >
        <div><i class="fa-solid fa-money-bills text-xl"></i></div>
        <div class="py-2 text-lg">Jami qarzdorlik</div>
        <div class="text-xl font-bold">
          {{ props.debts.toLocaleString() }}
          <span class="text-sm font-normal">so'm</span>
        </div>
        <div
          class="w-3 h-14 absolute right-0 top-1/2 transform -translate-y-1/2 rounded-tl-lg rounded-bl-lg bg-linear-to-b from-violet-900 to-violet-500 light:from-violet-700 light:to-violet-300"
        ></div>
      </div>
    </div>
    <div class="w-6/12 md:w-4/12 lg:max-w-[350px] px-3 pb-5">
      <div
        class="px-3 py-4 relative bg-gray-800 rounded-2xl shadow-lg shadow-gray-700 light:bg-gray-50 light:shadow-black/20"
      >
        <div><i class="fa-solid fa-users text-xl"></i></div>
        <div class="py-2 text-lg">Mijozlar soni</div>
        <div class="text-xl font-bold">
          {{ props.clientCount.toLocaleString() }}
          <span class="text-sm font-normal">ta</span>
        </div>

        <div
          class="w-3 h-14 absolute right-0 top-1/2 transform -translate-y-1/2 rounded-tl-lg rounded-bl-lg bg-linear-to-b from-teal-700 to-teal-400 light:from-teal-600 light:to-teal-300"
        ></div>
      </div>
    </div>
  </div>
</template>
