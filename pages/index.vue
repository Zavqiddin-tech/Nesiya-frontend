<script setup>
useHead({
  title: "Dashboard",
});
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    "user",
  ],
});

import { ref, onMounted } from "vue";

// strore
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const { user } = authStore;

const allTrade = ref(0);
const percentage = ref(0);
const calculatePaid = () => {
  allTrade.value = user.totalPay + user.debts;
  percentage.value = (user.totalPay / allTrade.value) * 100;

  if(Number.isInteger(percentage.value)) {
    percentage.value = percentage.value.toFixed(0);
  } else {
    percentage.value = percentage.value.toFixed(2);
  }
  
};

onMounted(() => {
  calculatePaid();
});
</script>

<template>
  <div>
    <UiResultCards
      :clientCount="user.clientCount"
      :debts="user.debts"
    />
    <UiProgressBar :progress="Number(percentage)" />

  </div>
</template>
