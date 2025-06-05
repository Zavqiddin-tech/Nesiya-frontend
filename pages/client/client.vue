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

import { reactive } from "vue";
const state = reactive({
  name: "",
});

// store
import { useModaltStore } from "~/stores/modal";
import { useClientStore } from "~/stores/post/client";
const modalStore = useModaltStore();
const clientStore = useClientStore();

const search = () => {
  clientStore.toggleLoading = true
  clientStore.searchClient(state.name.trim())
};
</script>

<template>
  <ModalClientModal />
  <div class="flex justify-between items-center">
    <div class="text-md sm:text-xl">Mijozlar</div>

    <div>
      <UButton
        @click="modalStore.setModal(true)"
        size="xs"
        class="text-md cursor-pointer"
        >mijoz qo'shish</UButton
      >
    </div>
  </div>
  <div class="pt-5 flex gap-3">
    <UInput
      v-model="state.name"
      color="primary"
      highlight
      placeholder="Search..."
    />
    <UButton @click="search" :loading="clientStore.toggleLoading" class="cursor-pointer">qidiruv {{ clientStore.toggleLoading }}</UButton>
  </div>
  <div class="pt-6">
    <TableClientTable />
  </div>
</template>

<style lang="scss"></style>
