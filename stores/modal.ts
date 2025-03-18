import { defineStore } from "pinia";

export const useModaltStore = defineStore("modal", {
  state: () => ({
    modal: false,
    upModal: false,
    editId: "",
  }),

  actions: {
    setModal(val: boolean) {
      this.modal = val;
    },
    setUpModal(val: boolean) {
      this.upModal = val;
    },
    setEditId(val: string) {
      this.editId = val;
    },
  },
});
