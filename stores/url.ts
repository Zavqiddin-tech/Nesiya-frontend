import { defineStore } from "pinia";

export const useUrlStore = defineStore('url', {

	state: ()=> ({
		url: "https://nesiya.zavqiddin.uz/api",
	})

})