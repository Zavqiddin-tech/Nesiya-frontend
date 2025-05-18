<script setup>
import { reactive, onMounted } from "vue";

// strore
import { useTradeStore } from "~/stores/post/trade";
import { usePayStore } from "~/stores/post/pay";
const tradeStore = useTradeStore();
const payStore = usePayStore();



const router = useRouter();
const _id = router.currentRoute.value.params._id;
const total = (a, b) => {
  return a - b;
};

const state = reactive({ clientId: _id, amount: null });

const add = () => {
  payStore.addPay(state);
  state.amount  = null
};

const fDate = new Intl.DateTimeFormat("ru-RU", {
  dateStyle: "short",
});
const fTime = new Intl.DateTimeFormat("ru-RU", {
  timeStyle: "short",
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
            <UDrawer title="To'lov qilish va monitoring">
              <UButton
                @click="state.tradeId = item._id"
                color="success"
                variant="soft"
                class="text-xs sm:text-base"
                >{{ item.paid.toLocaleString() }}
                <Icon name="mdi:contactless-payment" />
              </UButton>

              <template #body>
                <div class="min-h-[300px] mb-15 relative">
                  <div
                    v-if="item.payHistory.length > 0"
                    v-for="pay of item.payHistory"
                  >
                    <div>
                      <USeparator
                        :label="fDate.format(new Date(pay.createdAt))"
                        color="primary"
                        type="dashed"
                      />
                      <div class="text-sm">Pul o'tkazmasi</div>
                      <div>
                        <span class="pr-3 text-xs font-bold text-green-400"
                          >Muvaffaqiyatli</span
                        >
                        <span class="text-sm text-gray-300">{{
                          fTime.format(new Date(pay.createdAt))
                        }}</span>
                      </div>
                      <div class="text-xl font-bold">
                        {{ pay.amount.toLocaleString() }}
                      </div>
                      <div>{{ pay.detail }}</div>
                    </div>
                  </div>
                  <div v-else>to'lov mavjud emas</div>
                  <div
                    class="h-[50px] w-full flex justify-center items-center gap-3 fixed bottom-0 bg-zinc-900"
                  >
                    <UInput
                      v-model="state.amount"
                      type="number"
                      variant="subtle"
                      size="xl"
                      placeholder="pul o'tkazish"
                    />
                    <UButton @click="add" size="xl">To'lash</UButton>
                  </div>
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
