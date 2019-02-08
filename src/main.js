import Vue from "vue"
import App from "./App.vue"
import { createStore } from "./store"

// wait for store rehydration
async function init() {
  const store = await createStore()

  new Vue({
    store,
    render: h => h(App),
  }).$mount("#app")
}

init()
