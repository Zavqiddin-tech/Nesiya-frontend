import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  actions: {
    async login(data: { userName: string; password: string }) {
      const router = useRouter()
      const token = useCookie('testToken')
      const toast = useToast()
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.post(
          "http://localhost:8080/api/auth/login",
          data
        );

				token.value = res.data.accessToken
        router.push('/')
      } catch (error: any) {
				toast.add({title: "Login yoki parol xato"})
      }
    },
		async checkUser() {
			const token = useCookie('testToken')
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.get(
          "http://localhost:8080/api/auth/checkuser",
          {
						headers: {
							Authorization: `Bearer ${token.value}`
						}
					}
        );
      } catch (error: any) {
        throw error
      }
    },
  },
});
