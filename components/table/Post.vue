<script setup>
import { onMounted } from "vue";
import { io } from "socket.io-client";
import { useAuthStore } from "~/stores/auth";
import { usePostStore } from "~/stores/post/post";
const authStore = useAuthStore();
const postStore = usePostStore();
// Socket connection
const socket = io("ws://localhost:4100"); // backent url
socket.on(`newPost/${authStore.user.id}`, (data) => {
  postStore.posts.unshift(data);
});
onMounted(() => {
  postStore.getAllPost();
});
</script>

<template>
  <div v-if="Array.isArray(postStore.posts) && postStore.posts.length > 0">
    <table class="table-auto w-full">
      <thead class="border-b border-zinc-400 text-left">
        <tr>
          <th>#</th>
          <th class="py-4 font-medium">Ism familya</th>
          <th class="py-4 font-medium">Kiritildi</th>
          <th class="py-4 font-medium">Holati</th>
          <th class="py-4 font-medium">user-name</th>
          <th class="py-4 font-medium">role</th>
          <th class="py-4 font-medium text-right">edit</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of postStore.posts"
          class="border-b border-zinc-300 hover:bg-black hover:bg-opacity-20"
        >
          <td class="min-w-8 py-3">{{ index + 1 }}</td>
          <td class="min-w-40 name">{{ item.title }}</td>

          <td>{{ item.body }}</td>
          <td class="min-w-24">status test</td>

          <td class="min-w-28 py-3">
            <span class="text-sm font-medium text-sky-600 underline"
              >@zavqi</span
            >
          </td>

          <td class="min-w-28 py-3">
            <span
              class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset"
              >admin</span
            >
          </td>

          <td class="float-end py-3">
            <div class="flex items-start gap-3">
              <div
                @click="edit(item.id)"
                class="cursor-pointer hover:text-blue-500 text-lg"
              >
                <i class="fa-regular fa-pen-to-square"></i>
              </div>
              <div
                @click="del(item.id)"
                class="cursor-pointer hover:text-blue-500 text-lg"
              >
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <UButton v-if="postStore.isEnd" color="error">TUGADI</UButton>
      <UButton v-else @click="postStore.getAllPost()">Yana</UButton>
    </div>
  </div>
</template>
