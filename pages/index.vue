<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    "admin",
  ],
});
import { reactive, onMounted } from "vue";
import axios from "axios";
import { io } from "socket.io-client";
const toast = useToast();

const state = reactive([]);
const post = reactive({ title: "", body: "" });
const one = reactive([]);

// Socket connection
const socket = io("ws://localhost:8080"); // backent url

const getAll = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/post/get-all");
    state.splice(0, state.length, ...res.data);
  } catch (e) {
    console.log(e);
  }
};
const addPost = async () => {
  if (post.title && post.body) {
    try {
      const res = await axios.post("http://localhost:8080/api/post/create", {
        ...post,
      });
      console.log(res.data);
      if (res.status == 200) toast.add({ title: "Muvaffaqiyatli qo'shildi" });
    } catch (e) {
      console.log(e);
    }
  } else {
    toast.add({ title: "Barcha maydonni to'ldiring" });
  }
};
const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row._id),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];
const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "body",
    label: "Body",
  },
  {
    key: "_id",
    label: "ID",
  },
  {
    key: "actions",
  },
];

onMounted(() => {
  getAll();
  socket.on("salom", (data) => {
    state.push(data);
  });
});
</script>

<template>
  <div>index</div>
  <div class="w-[200px]">
    <div class="mb-5">
      <UInput v-model="post.title" placeholder="title" />
    </div>
    <div class="mb-5">
      <UInput v-model="post.body" placeholder="body" />
    </div>
    <div>
      <UButton @click="addPost()">Click</UButton>
    </div>
  </div>
  <div>
    <div v-if="Array.isArray(state) && state.length > 0">
      <UTable :rows="state" :columns="columns">
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </div>
    <div v-else>
      <div>Ma'lumotlar yo'q</div>
    </div>
  </div>
</template>
