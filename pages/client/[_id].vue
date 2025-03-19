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
  <div v-if="Object.keys(clientStore.client).length > 0" class="pt-12 flex">
    <!-- about client -->
    <div class="min-w-[300px] min-h-[500px] p-3 pt-10 bg-gray-800 rounded-xl">
      <div class="flex justify-center">
        <NuxtImg
          class="w-[150px] h-[150px] object-cover rounded-full"
          src="/girl.jpg"
        />
      </div>
      <div
        class="pt-4 flex justify-center items-center text-xl font-medium capitalize"
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
      <div class="mt-10 p-2 border border-gray-500 rounded-lg">
        <div class="text-xs font-medium">Telefon raqam 1</div>
        <div class="text-sm font-medium">{{ clientStore.client.phoneOne }}</div>
      </div>
      <div class="mt-3 p-2 border border-gray-500 rounded-lg">
        <div class="text-xs font-medium">Telefon raqam 2</div>
        <div v-if="clientStore.client.phoneTwo" class="text-sm font-medium">
          {{ clientStore.client.phoneTwo }}
        </div>
        <div v-else class="text-sm font-medium text-red-400">kiritilmagan</div>
      </div>
    </div>
    <!-- statistika -->
    <div class="w-full pl-5">
      <div class="w-full mb-10 px-5 flex justify-around items-start gap-10 flex-wrap ">
        <div class=" w-[250px] px-3 py-4 bg-gray-800 rounded-2xl md:w-[350px] lg:w-[250px] lg:border-amber-500">
          <div class="text-[35px] text-sky-500">
            {{ clientStore.client.totalDebt.toLocaleString() }}
            <UBadge color="neutral" variant="outline">uzs</UBadge>
          </div>
          <div class="font-medium">Jami Xarid</div>
        </div>

        <div class=" w-[250px] px-3 py-4 bg-gray-800 rounded-2xl md:w-[350px] lg:w-[250px] lg:border-amber-500">
          <div class="text-[35px] text-violet-400">
            {{ clientStore.client.totalPurchase.toLocaleString() }}
            <UBadge color="neutral" variant="outline">uzs</UBadge>
          </div>
          <div class="font-medium">To'landi</div>
        </div>

        <div class=" w-[250px] px-3 py-4 bg-gray-800 rounded-2xl md:w-[350px] lg:w-[250px] lg:border-amber-500">
          <div class="text-[35px] text-pink-500">
            {{
              total(
                clientStore.client.totalDebt,
                clientStore.client.totalPurchase
              ).toLocaleString()
            }}
            <UBadge color="neutral" variant="outline">uzs</UBadge>
          </div>
          <div class="font-medium">Qarzdorlik</div>
        </div>
      </div>
      <TableClientTradeTable />
    </div>
  </div>
</template>
