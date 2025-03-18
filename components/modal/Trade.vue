<script setup>
import { reactive } from "vue";
import { useModaltStore } from "~/stores/modal";
const modalStore = useModaltStore();

const handleClose = () => {
  modalStore.setModal(false);
  modalStore.setUpModal(false);
  modalStore.setEditId("");
	state.text = ""
	state.price = ""
};

const state = reactive({});
</script>

<template>
  <UModal
    v-model:open="modalStore.modal"
    title="Savdo qo'shish"
    description="Har bir kiritilayotgan narsaga e'tibor bering"
    :ui="{ footer: 'justify-end' }"
    @update:open="handleClose"
  >
    <template #body>
      <UFormField label="Xarid" required class="mb-5">
        <UInput
          v-model="state.text"
          class="w-full mt-2"
          size="xl"
          placeholder="sotib olingan mahsulotlar"
        />
      </UFormField>
      <UFormField label="Narxi" required>
        <UInput
				type="number"
          v-model="state.price"
          class="w-full mt-2"
          size="xl"
          placeholder="jami summa"
        />
      </UFormField>
    </template>

    <template #footer>
      <UButton
        color="error"
        variant="soft"
        @click="handleClose"
      >bekor qilish</UButton>
      <UButton>Qo'shish</UButton>
    </template>
  </UModal>
</template>
