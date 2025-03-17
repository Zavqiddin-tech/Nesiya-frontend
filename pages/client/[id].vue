<script setup lang="ts">

useHead({
  title: "Mijozlar bo'limi",
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
const id = router.currentRoute.value.params.id
</script>

<template>
	mijozlar 
	{{ id }}
</template>