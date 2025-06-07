import { defineStore } from "pinia";

export const useUrlStore = defineStore('url', {

	state: ()=> ({
		url: "http://localhost:4100/api",
	})

})