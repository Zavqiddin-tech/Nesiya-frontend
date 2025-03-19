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
const router = useRouter();
const _id = router.currentRoute.value.params._id;

;
</script>

<template>
  savdo
  {{ _id }}
</template>
