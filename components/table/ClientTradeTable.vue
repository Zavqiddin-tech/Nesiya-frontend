<script setup>
import { onMounted } from "vue";
import { io } from "socket.io-client";

// strore
import { useAuthStore } from "~/stores/auth";
import { useClientStore } from "~/stores/post/client";
import { useTradeStore } from "~/stores/post/trade";
const authStore = useAuthStore();
const clientStore = useClientStore();
const tradeStore = useTradeStore();

// Socket connection
const socket = io("ws://localhost:4100"); // backent url
socket.on(`newTrade/${authStore.user.id}`, (data) => {
  console.log(data);
  tradeStore.trades.unshift(data.newTrade);
  clientStore.client = { ...data.newClient };
  console.log(data.newClient);
});

const router = useRouter();
const _id = router.currentRoute.value.params._id;
const total = (a, b) => {
  return a - b;
};
const fDate = new Intl.DateTimeFormat("ru-RU", {
  dateStyle: "short",
});
onMounted(() => {
	tradeStore.reset()
  tradeStore.getAllTradeByClient(_id);
});
</script>

<template>
  <div v-if="Array.isArray(tradeStore.trades) && tradeStore.trades.length > 0">
    <table class="table-auto w-full">
      <thead class="border-b border-white/60 text-left">
        <tr>
          <th>#</th>
          <th class="py-4 font-medium">savdo</th>
          <th class="py-4 font-medium">narxi</th>
          <th class="py-4 font-medium">to'landi</th>
          <th class="py-4 font-medium">qarzdorlik</th>
          <th class="py-4 font-medium">kiritildi</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of tradeStore.trades"
          class="border-b border-white/50 dark:hover:bg-white/10 light:hover:bg-black/20"
        >
          <td class="min-w-8 py-3">{{ index + 1 }}</td>
          <td>
            {{ item.text }}
          </td>

          <td>
            <UButton color="info" variant="soft"
              >{{ item.price.toLocaleString() }} uzs</UButton
            >
          </td>
          <td>
            <UButton color="success" variant="soft"
              >{{ item.paid.toLocaleString() }} uzs</UButton
            >
          </td>
          <td>
            <UButton color="error" variant="soft"
              >{{ total(item.price, item.paid).toLocaleString() }} uzs</UButton
            >
          </td>
          <td class="min-w-24">{{ fDate.format(new Date(item.createdAt)) }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="pt-10 flex justify-center">
      <UButton v-if="tradeStore.isEnd" color="error">TUGADI</UButton>
      <UButton v-else @click="tradeStore.getAllTradeByClient(_id)">Yana</UButton>
    </div>
  </div>
  <div v-else>Ma'lumot yoq</div>
</template>
