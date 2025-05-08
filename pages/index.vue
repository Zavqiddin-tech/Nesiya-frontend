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

// strore
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const { user } = authStore;
</script>

<template>
  <div>
    

    <UiResultCards
      :clientCount="user.clientCount"
      :totalPay="user.totalPay"
      :debts="user.debts"
    />
    <UiProgressBar :progress="76" />
  </div>
</template>
