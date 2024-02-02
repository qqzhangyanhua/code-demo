import { createApp, h } from "vue";

const App = {
  render() {
    return h("div", { id: "main" }, "hello world");
  },
};
createApp(App).mount("#app");