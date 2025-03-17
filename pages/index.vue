<script setup>
useHead({
  title: "Dashboard",
});
definePageMeta({
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    "user",
  ],
});
import { reactive, onMounted } from "vue";
import { io } from "socket.io-client";
const toast = useToast();

// strore
import { useAuthStore } from "~/stores/auth";
import { usePostStore } from "~/stores/post/post";
const authStore = useAuthStore();
const postStore = usePostStore();

const post = reactive({ title: "", body: "" });

// Socket connection
const socket = io("ws://localhost:4100"); // backent url

const addPost = async () => {
  if (post.title && post.body) {
    postStore.addPost({ title: post.title, body: post.body });
  } else {
    toast.add({ title: "Barcha maydonni to'ldiring !" });
  }
};



socket.on(`newPost/${authStore.user.id}`, (data) => {
  if ((data.user = authStore.user.id)) postStore.posts.unshift(data);
});
onMounted(() => {
  postStore.getAllPost();
});

</script>

<template>

  <div>
    <UIcon name="solar:home-angle-broken" />
  </div>
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
 
    </div>
    <div v-else>
      <div>Ma'lumotlar yo'q</div>
    </div>
    <div class="flex justify-center">
      <UButton @click="postStore.getAllPost()">Yana</UButton>
    </div>
  </div>
</template>
