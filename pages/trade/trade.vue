<script setup lang="ts">
useHead({
  title: "Savdo bo'limi",
});
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    "user",
  ],
});
</script>

<template>
  <ModalTrade />
  <div class="flex justify-between items-center">
    <div class="text-xl">Savdo bo'limi</div>
    <div>
      <NuxtLink to="/client/client"
        ><UButton class="text-md  text-black light:bg-lime-400 cursor-pointer">savdo</UButton>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss"></style>
