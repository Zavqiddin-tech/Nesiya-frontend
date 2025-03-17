<script setup lang="ts">

useHead({
  title: "Savdo bo'limi",
});
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'user',
  ],
});

const router = useRouter();
</script>

<template>
 
 {{ router.currentRoute.value.fullPath }}
 
</template>

<style lang="scss"></style>