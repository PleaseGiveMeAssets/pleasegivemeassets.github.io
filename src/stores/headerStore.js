import { defineStore } from "pinia";

export const useHeaderStore = defineStore("headerStore", {
  state: () => ({
    title: "기본 타이틀",
  }),
  actions: {
    setTitle(newTitle) {
      console.log(newTitle);
      this.title = newTitle;
    },
  },
});
