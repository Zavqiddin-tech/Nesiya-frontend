import { defineStore } from "pinia";

export const useUrlStore = defineStore('url', {

	state: ()=> ({
		url: "http://localhost:8080/api"
	})

})