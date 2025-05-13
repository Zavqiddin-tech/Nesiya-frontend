<script setup>
import { onMounted } from "vue";
import { useClientStore } from "~/stores/post/client";
const clientStore = useClientStore();


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
          <th class="py-4 font-medium text-sm sm:text-base">Ism familya</th>
          <th class="py-4 font-medium text-sm sm:text-base">Qarzdorlik</th>
          <th class="py-4 font-medium hidden sm:block">kiritildi</th>
          <th class="py-4 font-medium ">Aloqa</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of clientStore.clients"
          class="border-b border-white/50 dark:hover:bg-white/10 light:hover:bg-black/20"
        >
          <td class="min-w-8 py-3 text-xs sm:text-base">{{ index + 1 }}</td>
          <td>
            <div class="flex items-center">
              <NuxtLink :to="`/client/${item._id}`" class="capitalize whitespace-nowrap text-sm sm:text-base">
                <span
                  v-if="
                    item.lName[0] == 's' ||
                    (item.lName[0] == 'S' && item.lName[1] == 'h') ||
                    item.lName[1] == 'H'
                  "
                >
                  Sh.
                </span>
                <span v-else>{{ item.lName[0] }}.</span>

                {{ item.fName }}
              </NuxtLink>

              <NuxtImg v-if="item.verify" class="w-4 ml-1" src="/verify.png" />
            </div>
          </td>
          <td>
            <UButton color="error" variant="soft"
              >{{
                total(item.totalDebt, item.totalPurchase).toLocaleString()
              }}
              uzs</UButton
            >
          </td>
          <td class="min-w-24 hidden sm:block">{{ fDate.format(new Date(item.createdAt)) }}</td>
          <td>
            <div>
              <UButton color="info" variant="subtle" size="xs"
                >{{ item.phoneOne }}
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
