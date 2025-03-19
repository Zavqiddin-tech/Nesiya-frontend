<script setup>
import { reactive } from "vue";
import { useModaltStore } from "~/stores/modal";
import { useTradeStore } from "~/stores/post/trade";
const modalStore = useModaltStore();
const tradeStore = useTradeStore()

const toast = useToast();
const handleClose = () => {
  modalStore.setModal(false);
  modalStore.setUpModal(false);
  modalStore.setEditId("");
	state.text = ""
	state.price = ""
};

const router = useRouter();
const _id = router.currentRoute.value.params._id;
const state = reactive({clientId: _id});

const addTrade = async () => {
  if (state.text && state.price && state.clientId) {
    tradeStore.addTrade({ ...state });
    handleClose();
  } else {
    toast.add({ title: "Barcha maydonni to'ldiring !" });
  }
};
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
      <UButton @click="addTrade">Qo'shish</UButton>
    </template>
  </UModal>
</template>
