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
    <UiProgressBar
      :progress="76"
    />
    
  </div>
</template>
