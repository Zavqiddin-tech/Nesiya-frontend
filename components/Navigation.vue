<script setup>
const menu = [
  {
    url: "/",
    icon: "fa-solid fa-house",
  },
  {
    url: "/trade/trade",
    icon: "fa-solid fa-chart-simple",
  },
  {
    url: "/client/client",
    icon: "fa-solid fa-users",
  },
  {
    url: "/document/document",
    icon: "fa-solid fa-file-lines",
  },
  {
    url: "/document/payment",
    icon: "fa-solid fa-wallet",
  },
];

const router = useRouter();
</script>

<template>
  <div class="sidebar pb-2 w-full z-10 fixed bottom-0 backdrop-blur-sm">
    <ul class="admin-list ml-5 mr-5 flex justify-between">
      <li v-for="(item, index) in menu" :key="index">
        <NuxtLink
          :to="item.url"
          :class="{ active: router.currentRoute.value.fullPath == item.url }"
        >
          <div class="px-5 py-3 flex items-center gap-3">
            <i :class="`${item.icon} text-lg`"></i>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar ul li .active {
  color: oklch(0.841 0.238 128.85); /* Aktiv holat uchun rang */
}
</style>
