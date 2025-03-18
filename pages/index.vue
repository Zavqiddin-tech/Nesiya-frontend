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
import { reactive } from "vue";

const toast = useToast();

// strore
import { usePostStore } from "~/stores/post/post";
const postStore = usePostStore();

const post = reactive({ title: "", body: "" });

const addPost = async () => {
  if (post.title && post.body) {
    postStore.addPost({ title: post.title, body: post.body });
  } else {
    toast.add({ title: "Barcha maydonni to'ldiring !" });
  }
};
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
    <TablePost />
  </div>
</template>
