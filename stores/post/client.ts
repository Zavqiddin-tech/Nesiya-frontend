import { defineStore } from "pinia";
import axios from "axios";

import { useUrlStore } from "../url";

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: [] as any[],
    client: {},
    limit: 10,
    isEnd: false,
    toggleLoading: false,
  }),

  actions: {
    // Hamma mijozlarni olish
    async getAllClient() {
      const url = useUrlStore().url;
      const token = useCookie("testToken");
      const toast = useToast();

      try {
        const res = await axios.get(`${url}/client/get-all`, {
          params: { limit: this.limit },
          headers: { Authorization: `Bearer ${token.value}` },
        });
        this.clients = [...res.data];
        if (res.data.length < this.limit) {
          this.isEnd = true;
          return false;
        }
        this.limit += 10;
      } catch (error: any) {
        toast.add({ title: "xatolik", description: error });
      }
    },

    // bitta mijozni olish
    async getOneClient(_id: string) {
      const url = useUrlStore().url;
      const token = useCookie("testToken");
      const toast = useToast();

      try {
        const res = await axios.get(`${url}/client/get-one/${_id}`, {
          headers: { Authorization: `Bearer ${token.value}` },
        });
        this.client = { ...res.data };
      } catch (error: any) {
        toast.add({ title: "xatolik", description: error });
      }
    },

    // yangi mijoz qo'shish
    async addClient(data: {}) {
      const url = useUrlStore().url;
      const token = useCookie("testToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.post(`${url}/client/create`, data, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        if (res.status === 200) {
          this.clients.unshift(res.data);
          toast.add({
            title: "Ro'yxatga olindi",
            description: `${res.data.fName} ${res.data.lName}`,
          });
        }
      } catch (error: any) {
        throw error;
      }
    },

    async searchClient(name: string) {
      const url = useUrlStore().url;
      const token = useCookie("testToken");
      const toast = useToast();

      try {
        const res = await axios.get(`${url}/client/search`, {
          params: { name: name, limit: this.limit },
          headers: { Authorization: `Bearer ${token.value}` },
        });
        if (res.status === 200) {
          this.clients = [...res.data];
          this.toggleLoading = false;
          if (res.data.length < this.limit) {
          this.isEnd = true;
          return false;
        }
        this.limit += 10;
        this.toggleLoading = false;
        }
      } catch (error: any) {
        toast.add({ title: "xatolik", description: error });
        this.toggleLoading = false;
      }
    },

    // reset
    reset() {
      this.limit = 10
      this.isEnd = false
    }
  },
});
