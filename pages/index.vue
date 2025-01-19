<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    "admin",
  ],
});
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { io } from "socket.io-client";

// strore 
import { usePostStore } from "#build/imports";
const postStore = usePostStore()

const state = reactive([]);
const post = reactive({ title: "", body: "" });
const limit = ref(10);

// Socket connection
const socket = io("ws://localhost:8080"); // backent url

const addPost = async () => {
  if (post.title && post.body) {
    postStore.addPost({title: post.title, body: post.body})
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

socket.on("newPost", (data) => {
  postStore.posts.unshift(data);
});
onMounted(() => {
  postStore.getAllPost();
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
    <div v-if="Array.isArray(postStore.posts) && postStore.posts.length > 0">
      <UTable :rows="postStore.posts" :columns="columns">
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
    <div class="flex justify-center">
      <UButton @click="postStore.getAllPost()">Yana</UButton>
    </div>
  </div>
</template>
