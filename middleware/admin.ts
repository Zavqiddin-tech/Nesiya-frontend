import { useNuxtApp } from "#app";
import { useAuthStore } from "~/stores/auth";


export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore()
	// await authStore.login({userName: "test", password: "test"})
	await authStore.checkUser()
});