import { defineStore } from "pinia";
import axios from "axios";

import { useUrlStore } from "../url";

export const usePostStore = defineStore("post", {


	state: ()=> ({
		posts: [] as any[],
    limit: 10,
    isEnd: false
	}),


  actions: {
    
    async getAllPost() {
      const url = useUrlStore().url
      const token = useCookie("testToken");
      const toast = useToast();

      try {
        const res = await axios.get(`${url}/post/get-all`, {
          params: { limit: this.limit },
          headers: { Authorization: `Bearer ${token.value}` },
        });
        console.log(res.data);
				this.posts = [...res.data]
        if (res.data.length < this.limit) {
          this.isEnd = true
          return false
        }
        this.limit += 10
        console.log(this.limit);
      } catch (error: any) {
        toast.add({ title: "Login yoki parol xato" });
      }
    },

    async addPost(data: {title: string, body: string}) {
      const url = useUrlStore().url
      const token = useCookie("testToken");
      try {
        // Backend API'ga POST so'rov yuborish
        const res = await axios.post(
          `${url}/post/create`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
      } catch (error: any) {
        throw error;
      }
    },
  },
});
