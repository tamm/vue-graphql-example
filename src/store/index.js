import Vue from "vue"
import Vuex from "vuex"
import localForage from "localforage"
import { updateToken } from "../apiRequest"
import { actions } from "./actions"

Vue.use(Vuex)

let savedState = false
let store = false

const initialState = {
  settings: {
    showFlags: false,
  },
  countries: [],
}

const persistState = store => {
  // Reinflate state at init
  store.replaceState({
    ...initialState,
    ...store.state,
    ...savedState,
  })

  // Save state on mutation / state changes
  store.subscribe((mutations, state) => {
    localForage.setItem("vuex", state)
  })
}

export async function createStore() {
  if (!store) {
    savedState = await localForage.getItem("vuex")

    // TODO: Rehydrating auth token from store
    updateToken(savedState && savedState.auth ? savedState.auth.token : false)

    store = new Vuex.Store({
      mutations: {
        updateSettings(state, settings) {
          state.settings = settings
        },
        updateCountries(state, countries) {
          state.countries = countries
        },
      },
      actions: {
        ...actions,
      },
      plugins: [persistState],
    })
  }

  return store
}
