<script setup>
import { onMounted } from "vue";
useHead({
  title: "Mijozlar bo'limi",
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
const total = (a, b) => {
  return a - b;
};

// store
import { useClientStore } from "~/stores/post/client";
const clientStore = useClientStore();
// store
import { useModaltStore } from "~/stores/modal";
const modalStore = useModaltStore();

onMounted(() => {
  clientStore.getOneClient(String(_id));
});
</script>

<template>
  <ModalTradeModal />
  <div class="flex justify-between items-center">
    <div class="text-xl">Shaxsiy kabinet</div>
    <div>
      <div>
        <UButton
          @click="modalStore.setModal(true)"
          size="md"
          class="text-md cursor-pointer"
          >+ savdo qo'shish</UButton
        >
      </div>
    </div>
  </div>
  <div
    v-if="Object.keys(clientStore.client).length > 0"
    class="pt-12 flex flex-col lg:flex-row"
  >
    <!-- about client -->
    <div
      class="min-w-[300px] h-[220px] lg:h-[450px] p-3 pt-10 bg-gray-800 rounded-xl"
    >
      <div class="flex gap-5 justify-center lg:flex-col">
        <div class="flex justify-center">
          
          <UIcon name="ic:round-person" class="text-[80px]"/>
        </div>
        <div>
          <div
            class="pt-4 flex justify-center items-center text-xl font-medium capitalize lg:pt-0"
          >
            {{ clientStore.client.fName }} {{ clientStore.client.lName }}
            <NuxtImg
              v-if="clientStore.client.verify"
              class="w-6 ml-1"
              src="/verify.png"
            />
          </div>
          <div class="pt-2 flex justify-center">
            <UBadge variant="soft" color="success">yangi mijoz</UBadge>
          </div>
        </div>
      </div>

      <div class="mt-5 flex lg:flex-col items-center justify-center gap-3">
        <div class="flex items-center">
          <div class="flex items-center text-sm font-medium text-blue-400">
            <UIcon name="line-md:phone-call-loop" size="20" />:
            {{ clientStore.client.phoneOne }}
          </div>
        </div>
        <span class="lg:hidden">|</span>
        <div class="flex items-center">
          <div
            v-if="clientStore.client.phoneTwo"
            class="flex items-center text-sm font-medium text-blue-400"
          >
            <UIcon name="line-md:phone-call-loop" size="20" />:
            {{ clientStore.client.phoneTwo }}
          </div>
          <div
            v-else
            class="flex items-center text-sm font-medium text-red-400"
          >
            <UIcon name="line-md:phone-call-loop" size="20" />: kiritilmagan
          </div>
        </div>
      </div>
    </div>
    <!-- statistika -->
    <div class="w-full lg:pl-5">
      <div
        class="w-full mt-10 mb-10 flex justify-around items-start flex-wrap lg:mt-0"
      >
        <!-- xarid -->
        <div class=" p-3 w-6/12 lg:w-[260px]">
          <div class="px-3 py-4 bg-gray-800 rounded-2xl ">
            <div
              class="text-[16px] sm:text-[22px] text-sky-500 whitespace-nowrap"
            >
              {{ clientStore.client.totalDebt.toLocaleString() }}
              
            </div>
            <div class="text-[10px] font-medium sm:text-[16px]">Jami Xarid</div>
          </div>
        </div>

        <!-- to'landi -->
        <div class=" p-3 w-6/12 lg:w-[260px]">
          <div class="px-3 py-4 bg-gray-800 rounded-2xl ">
            <div
              class="text-[16px] sm:text-[22px] text-violet-400 whitespace-nowrap"
            >
              {{ clientStore.client.totalPurchase.toLocaleString() }}
              
              
            </div>
            <div class="text-[10px] font-medium sm:text-[16px]">To'landi</div>
          </div>
        </div>

        <!-- qarzdorlik -->
        <div class=" p-3 w-12/12 lg:w-[260px]">
          <div class="px-3 py-4 bg-gray-800 rounded-2xl">
            <div
              class="text-[16px] sm:text-[22px] text-pink-500 whitespace-nowrap"
            >
              {{
                total(
                  clientStore.client.totalDebt,
                  clientStore.client.totalPurchase
                ).toLocaleString()
              }}
              
            </div>
            <div class="text-[10px] font-medium sm:text-[16px]">Qarzdorlik</div>
          </div>
        </div>
      </div>
      <TableClientTradeTable />
    </div>
  </div>
</template>
