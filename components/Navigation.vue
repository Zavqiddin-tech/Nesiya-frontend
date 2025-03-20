<script setup>
const menu = [
  {
    url: "/",
    icon: "solar:home-angle-broken",
  },
  {
    url: "/trade/trade",
    icon: "solar:chart-square-broken",
  },
  {
    url: "/client/client",
    icon: "solar:users-group-rounded-broken",
  },
  {
    url: "/document/document",
    icon: "solar:document-text-broken",
  },
  {
    url: "/document/payment",
    icon: "solar:wallet-money-broken",
  },
];

const router = useRouter();
</script>

<template>
  <div class="sidebar w-full z-10 fixed bottom-0 backdrop-blur-sm">
    <ul class="admin-list ml-5 mr-5 flex justify-between">
      <li v-for="(item, index) in menu" :key="index">
        <NuxtLink
          :to="item.url"
          :class="{ active: router.currentRoute.value.fullPath == item.url }"
        >
          <div class="px-5 py-3 flex items-center gap-3">
            <UIcon :name="item.icon" size="25" />
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
