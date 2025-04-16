import { defineStore } from "pinia";
import axios from "axios";

import { useUrlStore } from "../url";

export const usePayStore = defineStore("pay", {
	state: () => ({
		
	}),

	actions: {
		
		// yangi mijoz qo'shish
		async addPay(data: {}) {
			const url = useUrlStore().url;
			const token = useCookie("testToken");
			const toast = useToast();
			try {
				// Backend API'ga POST so'rov yuborish
				const res =  await axios.post(`${url}/pay/create`, data, {
					headers: {
						Authorization: `Bearer ${token.value}`,
					},
				});
				if (res.status === 200) {
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

		
	},
});
