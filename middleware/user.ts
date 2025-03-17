import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("testToken");
  const authStore = useAuthStore();

  if (!token.value) {
    return navigateTo('/auth')
  }

  try {
    await authStore.checkUser();
  } catch (error: any) {
    if (error.response || error.response.status == 401) {
      token.value = null;
      return navigateTo('/auth')
    } else {
      console.error("Xato:", error.message);
    }
  }
});
