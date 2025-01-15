import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null,
    token: null,
    error: null,
  }),
  actions: {
		async login(data: { userName: string; password: string }) {
			const token = useCookie('testToken')
			const toast = useToast()
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.post(
          "http://localhost:8080/api/auth/login",
          data
        );

				console.log(res.data.accessToken);
				token.value = res.data.accessToken
      } catch (error: any) {
        console.log(error.response.data.message);
				toast.add({title: error.response.data.message})
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

				if (res.status == 401) {
					useRouter().push('/auth');
				}

      } catch (error: any) {
        console.log(error);
      }
    },
  },
});
