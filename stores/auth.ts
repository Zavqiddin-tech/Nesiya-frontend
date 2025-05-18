import { defineStore } from "pinia";
import axios from "axios";

import { useUrlStore } from "./url";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
  }),
  
  actions: {
    async login(data: { userName: string; password: string }) {
      const url = useUrlStore().url
      const token = useCookie("testToken");
      const toast = useToast();
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.post(
          `${url}/auth/login`,
          data
        );

        token.value = res.data.accessToken;
        navigateTo('/')
        toast.add({ title: "Muvaffaqiyatli", description: "tizimga kirildi", icon: "material-symbols:check-circle-outline-rounded" });
      } catch (error: any) {
        toast.add({ title: "Tekshiring", description: "login yoki parol xato", icon: "solar:shield-warning-broken" });
      }
    },
    async checkUser() {
      const url = useUrlStore().url
      const token = useCookie("testToken");
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.get(
          `${url}/auth/checkuser`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
        this.user = res.data;
      } catch (error: any) {
        throw error;
      }
    },
  },
});
