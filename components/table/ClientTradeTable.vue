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
  tradeStore.reset();
  tradeStore.getAllTradeByClient(_id);
});
</script>

<template>
  <div v-if="Array.isArray(tradeStore.trades) && tradeStore.trades.length > 0">
    <table class="table-auto w-full">
      <thead class="border-b border-white/60 text-left">
        <tr>
          <th>#</th>
          <th class="py-4 font-medium text-sm sm:text-base">Savdo</th>
          <th class="py-4 font-medium text-sm sm:text-base">Narxi</th>
          <th class="py-4 font-medium text-sm sm:text-base">Qarz</th>
          <th class="py-4 font-medium text-sm sm:text-base">To'lov</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of tradeStore.trades"
          class="border-b border-white/50 dark:hover:bg-white/10 light:hover:bg-black/20"
        >
          <td class="min-w-3 py-3 text-xs sm:text-base">{{ index + 1 }}</td>
          <td class="w-40">
            <UPopover>
              <UButton
                :label="`${item.text.substring(0, 10)} ...`"
                color="info"
                variant="link"
              />

              <template #content>
                <div class="pt-2 pl-2 text-sky-500 font-medium">
                  {{ fDate.format(new Date(item.createdAt)) }}
                </div>
                <div class="w-[200px] min-h-[200px] p-3">
                  {{ item.text }}
                </div>
              </template>
            </UPopover>
          </td>

          <td>
            <UButton color="neutral" variant="soft" class="text-xs sm:text-base"
              >{{ item.price.toLocaleString() }}
            </UButton>
          </td>

          <td>
            <UButton
              color="warning"
              variant="link"
              class="text-xs sm:text-base"
            >
              {{ total(item.price, item.paid).toLocaleString() }}

            </UButton>
          </td>
          <td>
            <UDrawer
              title="To'lov qilish va monitoring"
            >
              <UButton
                color="success"
                variant="soft"
                class="text-xs sm:text-base"
                >{{ item.paid.toLocaleString() }}
                <UIcon name="mdi:contactless-payment" />
              </UButton>

              <template #body>
                <div class="min-h-[300px]">
                  {{ item.payHistory }}
                  <UInput />
                </div>
              </template>
            </UDrawer>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pt-10 flex justify-center">
      <UButton v-if="tradeStore.isEnd" color="error">TUGADI</UButton>
      <UButton v-else @click="tradeStore.getAllTradeByClient(_id)"
        >Yana</UButton
      >
    </div>
  </div>
  <div v-else>Ma'lumot yoq</div>
</template>
