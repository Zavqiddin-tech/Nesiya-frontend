import { defineStore } from "pinia";
import axios from "axios";

import { useUrlStore } from "../url";
import { useClientStore } from "./client";
import { useTradeStore } from "./trade";

export const usePayStore = defineStore("pay", {
  state: () => ({}),

  actions: {
    // yangi mijoz qo'shish
    async addPay(data: {}) {
      const url = useUrlStore().url;
      const clientStore = useClientStore();
      const tradeStore = useTradeStore();
      const token = useCookie("testToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.post(`${url}/pay/create`, data, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        if (res.status === 200) {
          clientStore.client = { ...res.data.updatedClient };
          tradeStore.trades.forEach((item) => {
            if (item._id == res.data.newPay.tradeId) {
              item.paid += res.data.newPay.amount;
              item.payHistory.unshift(res.data.newPay);
            }
          });
          toast.add({
            title: "To'lov qilindi",
            description: `${res.data.newPay.amount}`,
            icon: "material-symbols:check-circle-outline-rounded",
          });
        }
      } catch (error: any) {
        toast.add({
          title: "Xatolik",
          description: `${error.response.data.message}`,
          icon: "material-symbols:check-circle-outline-rounded",
        });
        throw error;
      }
    },

    async getTodayPay() {
      const url = useUrlStore().url;
      const token = useCookie("testToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.get(`${url}/pay/get-today`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        if (res.status === 200) {
          return res.data;
        }
      } catch (error: any) {
        toast.add({
          title: "Xatolik",
          description: `${error.response.data.message}`,
          icon: "material-symbols:check-circle-outline-rounded",
        });
        throw error;
      }
    },
  },
});
