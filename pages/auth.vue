<script setup lang="ts">
const router = useRouter()
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore()
useHead({
  title: "Authorization",
});

definePageMeta({
  layout: "auth",
});

// Formning holati
const state = reactive({
  userName: "",
  password: "",
});

const login = () => {
	authStore.login(state)
}

</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <UCard class="w-full max-w-md p-6 shadow-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="login()">
        <!-- Email input -->
        <UInput
          v-model="state.userName"
          placeholder="username"
          type="text"
          class="w-full mb-4"
          required
        />

        <!-- Password input -->
        <UInput
          v-model="state.password"
          placeholder="Password"
          type="password"
          class="w-full mb-4"
          required
        />

        <!-- Submit button -->
        <UButton
          class="w-full"
          color="primary"
					@click="login()"
        >
          Login
        </UButton>
      </form>
    </UCard>
  </div>
</template>

<style>
/* Maxsus uslublar (ixtiyoriy) */
</style>
