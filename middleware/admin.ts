import { useNuxtApp } from "#app";
import { useAuthStore } from "~/stores/auth";


export default defineNuxtRouteMiddleware(async (to, from) => {
	const router = useRouter()
	const token = useCookie('testToken');
	const toast = useToast()
	const authStore = useAuthStore()

	if (!token.value) {
		toast.add({title: "Ro'yxatdan o'ting"})
    return router.push('/auth');
  }

	try {
		await authStore.checkUser()
	} catch (error: any) {
		if (error.response && error.response.status == 401) {
			token.value = null
      router.push("/auth"); 
    } else {
      console.error("Xato:", error.message);
    }
	}
});