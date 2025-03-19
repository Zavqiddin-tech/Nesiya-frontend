import { defineStore } from "pinia";
import axios from "axios";

import { useUrlStore } from "../url";

export const useTradeStore = defineStore("trade", {
  state: () => ({
    trades: [] as any[],
    trade: {},
    limit: 10,
    isEnd: false,
  }),

  actions: {
    // Hamma savdolarni olish
    async getAllTrade() {
      const url = useUrlStore().url;
      const token = useCookie("testToken");
      const toast = useToast();

      try {
        const res = await axios.get(`${url}/trade/get-all`, {
          params: { limit: this.limit },
          headers: { Authorization: `Bearer ${token.value}` },
        });
        this.trades = [...res.data];
        if (res.data.length < this.limit) {
          this.isEnd = true;
          return false;
        }
        this.limit += 10;
      } catch (error: any) {
        toast.add({ title: "xatolik", description: error });
      }
    },
    // Hamma savdolarni olish
    async getAllTradeByClient(_id: string) {
      const url = useUrlStore().url;
      const token = useCookie("testToken");
      const toast = useToast();

      try {
        const res = await axios.get(`${url}/trade/get-all-by-client/${_id}`, {
          params: { limit: this.limit },
          headers: { Authorization: `Bearer ${token.value}` },
        });
        this.trades = [...res.data];
        if (res.data.length < this.limit) {
          this.isEnd = true;
          return false;
        }
        this.limit += 10;
      } catch (error: any) {
        toast.add({ title: "xatolik", description: error });
      }
    },

    // bitta savdo olish
    async getOneTrade(_id: string) {
      const url = useUrlStore().url;
      const token = useCookie("testToken");
      const toast = useToast();

      try {
        const res = await axios.get(`${url}/trade/get-one/${_id}`, {
          headers: { Authorization: `Bearer ${token.value}` },
        });
        this.trade = { ...res.data };
        console.log(res.data);
      } catch (error: any) {
        toast.add({ title: "xatolik", description: error });
      }
    },

    // yangi mijoz qo'shish
    async addTrade(data: {}) {
      const url = useUrlStore().url;
      const token = useCookie("testToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.post(`${url}/trade/create`, data, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        if (res.status === 200) {
          toast.add({
            title: "Ro'yxatga olindi",
            description: `${res.data.newTrade.text}`,
            icon: "material-symbols:check-circle-outline-rounded",
          });
        }
      } catch (error: any) {
        throw error;
      }
    },

    // reset
    reset() {
      this.limit = 10;
      this.isEnd = false;
    },
  },
});
