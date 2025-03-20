<script setup>
import { onMounted } from "vue";
import { io } from "socket.io-client";
import { useAuthStore } from "~/stores/auth";
import { useClientStore } from "~/stores/post/client";
import { UButton } from "#components";
const authStore = useAuthStore();
const clientStore = useClientStore();

// Socket connection
const socket = io("ws://localhost:4100"); // backent url
socket.on(`newClient/${authStore.user.id}`, (data) => {
  clientStore.clients.unshift(data);
});

const total = (a, b) => {
  return a - b;
};
const fDate = new Intl.DateTimeFormat("ru-RU", {
  dateStyle: "short",
});
onMounted(() => {
  clientStore.reset();
  clientStore.getAllClient();
});
</script>

<template>
  <div
    v-if="Array.isArray(clientStore.clients) && clientStore.clients.length > 0"
  >
    <table class="table-auto w-full">
      <thead class="border-b border-white/60 text-left">
        <tr>
          <th>#</th>
          <th class="py-4 font-medium">ism familya</th>
          <th class="py-4 font-medium">qarzdorlik</th>
          <th class="py-4 font-medium">kiritildi</th>
          <th class="py-4 font-medium">telefon</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of clientStore.clients"
          class="border-b border-white/50 dark:hover:bg-white/10 light:hover:bg-black/20"
        >
          <td class="min-w-8 py-3">{{ index + 1 }}</td>
          <td>
            <div class="flex items-center">
              <NuxtLink :to="`/client/${item._id}`"
                >{{ item.fName }} {{ item.lName }}</NuxtLink
              >

              <NuxtImg v-if="item.verify" class="w-5 ml-1" src="/verify.png" />
            </div>
          </td>

          <td>
            <UButton color="warning" variant="soft"
              >{{
                total(item.totalDebt, item.totalPurchase).toLocaleString()
              }}
              uzs</UButton
            >
          </td>
          <td class="min-w-24">{{ fDate.format(new Date(item.createdAt)) }}</td>
          <td>
            <div>
              <UButton color="info" variant="subtle"
                >{{ item.phoneOne }}
              </UButton>
            </div>
            <div v-if="item.phoneTwo" class="pt-2">
              <UButton color="info" variant="subtle"
                >{{ item.phoneTwo }}
              </UButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-5 flex justify-center">
      <UButton v-if="clientStore.isEnd" color="error">TUGADI</UButton>
      <UButton v-else @click="clientStore.getAllClient()">Yana</UButton>
    </div>
  </div>
  <div v-else>Ma'lumot yoq</div>
</template>
