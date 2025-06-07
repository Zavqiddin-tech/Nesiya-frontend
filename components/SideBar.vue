<script setup>
const menu = [
  {
    name: "Dashboard",
    url: "/",
    icon: "fa-solid fa-house",
  },
  {
    name: "Savdo",
    url: "/trade/trade",
    icon: "fa-solid fa-chart-simple",
  },
  {
    name: "Mijozlar",
    url: "/client/client",
    icon: "fa-solid fa-users",
  },
  {
    name: "Document",
    url: "/document/document",
    icon: "fa-solid fa-file-lines",
  },
  {
    name: "To'lov",
    url: "/document/payment",
    icon: "fa-solid fa-wallet",
  },
];

const router = useRouter();
</script>

<template>
  <div class="sidebar pt-8 h-full">
    <div>
      <NuxtLink
        to="/"
        class="pl-10 text-xl font-semibold flex items-center gap-2"
      >
        <i class="fa-solid fa-chart-line text-lime-300 light:text-lime-500"></i>
        <span class="hidden lg:inline">Nesiya CRM</span>
      </NuxtLink>
      <div class="w-[80%] h-1 m-auto mt-10 mb-12 rounded-4xl bg-lime-300 light:bg-lime-500"></div>
    </div>
    <ul class="admin-list ml-5 mr-5 flex flex-col gap-4">
      <li v-for="(item, index) in menu" :key="index">
        <NuxtLink
          :to="item.url"
          :class="{ active: router.currentRoute.value.fullPath == item.url,
            'block bg-white/10 border-l-3 border-l-lime-300 text-lime-300  light:bg-gray-100 light:text-lime-500 light:border-l-lime-500': router.currentRoute.value.fullPath == item.url
           }"
        >
          <div class="px-5 py-3 flex items-center gap-3">
            <i :class="`${item.icon} text-lg`"></i>
            <span class="font-medium hidden lg:inline">{{ item.name }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar ul li .active {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>
