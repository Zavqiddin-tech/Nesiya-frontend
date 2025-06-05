import { defineStore } from "pinia";

export const useUrlStore = defineStore('url', {

	state: ()=> ({
		url: "localhost:4100/api",
	})

})
