<script setup>
import { reactive } from "vue";
import { useModaltStore } from "~/stores/modal";
import { useClientStore } from "~/stores/post/client";
const modalStore = useModaltStore();
const clientStore = useClientStore();

const toast = useToast();
const handleClose = () => {
  modalStore.setModal(false);
  modalStore.setUpModal(false);
  modalStore.setEditId("");
};
const handleCloseFull = () => {
  handleClose();
  state.fName = "";
  state.lName = "";
  state.phoneOne = "";
  state.phoneTwo = "";
  state.verify = false;
};

const state = reactive({
  fName: "",
  lName: "",
  phoneOne: "",
  phoneTwo: "",
  verify: false,
});
const addClient = async () => {
  if (state.fName && state.lName && state.phoneOne) {
    clientStore.addClient({ ...state });
    handleCloseFull();
  } else {
    toast.add({ title: "Barcha maydonni to'ldiring !" });
  }
};
</script>

<template>
  <UModal
    v-model:open="modalStore.modal"
    title="Mijoz qo'shish"
    description="Har bir kiritilayotgan narsaga e'tibor bering"
    :ui="{ footer: 'justify-end' }"
    @update:open="handleClose"
  >
    <template #body>
      <UFormField label="Ismi" required class="mb-3">
        <UInput
          v-model="state.fName"
          class="w-full mt-2"
          size="xl"
          placeholder="ism"
        />
      </UFormField>
      <UFormField label="Familyasi" required class="mb-3">
        <UInput
          v-model="state.lName"
          class="w-full mt-2"
          size="xl"
          placeholder="familya"
        />
      </UFormField>
      <UFormField label="Telefon" required class="mb-3">
        <UInput
          v-model="state.phoneOne"
          class="w-full mt-2"
          size="xl"
          placeholder="+998"
        />
      </UFormField>
      <UFormField label="qo'shimcha telefon" class="mb-3">
        <UInput
          v-model="state.phoneTwo"
          class="w-full mt-2"
          size="xl"
          placeholder="+998"
        />
      </UFormField>
    </template>

    <template #footer>
      <UButton color="error" variant="soft" @click="handleClose"
        >bekor qilish</UButton
      >
      <UButton class="text-black light:bg-lime-400" @click="addClient">Qo'shish</UButton>
    </template>
  </UModal>
</template>

<style scoped></style>
