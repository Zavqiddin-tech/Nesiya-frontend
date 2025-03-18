<script setup lang="ts">
useHead({
  title: "Mijozlar bo'limi",
});
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    "user",
  ],
});

import { TableClientTable } from "#components";
// store
import { useModaltStore } from "~/stores/modal";
const modalStore = useModaltStore();
</script>

<template>
  <ModalClientModal />
  <div class="flex justify-between items-center">
    <div class="text-xl">Mijozlar</div>
    <div>
      <UButton @click="modalStore.setModal(true)" size="md" class="text-md cursor-pointer">+ mijoz qo'shish</UButton>
    </div>
  </div>
  <div>
    <TableClientTable />
  </div>
</template>

<style lang="scss"></style>
