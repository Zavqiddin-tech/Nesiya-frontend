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

// store
import { useModaltStore } from "~/stores/modal";
const modalStore = useModaltStore();
</script>

<template>
  <ModalClientModal />
  <div class="flex justify-between items-center">
    <div class="text-md sm:text-xl">Mijozlar</div>
    <div>
      <UInput placeholder="Qidiruv"/>
    </div>
    <div>
      <UButton
        @click="modalStore.setModal(true)"
        class="text-md cursor-pointer"
        >+ mijoz qo'shish</UButton
      >
    </div>
  </div>
  <div class="pt-10">
    <TableClientTable />
  </div>
</template>

<style lang="scss"></style>
