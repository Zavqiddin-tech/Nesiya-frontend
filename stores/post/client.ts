import { defineStore } from "pinia";
import axios from "axios";

import { useUrlStore } from "../url";

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: [] as any[],
    limit: 10,
    isEnd: false,
  }),

  actions: {
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
          toast.add({
            title: "Ro'yxatga olindi",
            description: `${res.data.fName} ${res.data.lName}`,
            icon: "material-symbols:check-circle-outline-rounded",
          });
        }
      } catch (error: any) {
        throw error;
      }
    },
  },
});
