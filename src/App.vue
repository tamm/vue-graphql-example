<template>
  <div id="app">
    <div id="logos">
      <img width="256" alt="Vue logo" src="./assets/logo.svg" />
      <span class="plus">+</span>
      <img width="256" alt="GraphQL logo" src="./assets/GraphQL_Logo.svg" />
    </div>

    <h3>Countries</h3>

    <label>
      Show Flags?
      <input
        type="checkbox"
        name="showFlags"
        v-model="settings.showFlags"
        v-on:change="changeSetting()"
      />
    </label>

    <Countries />

    <div id="footer">
      Made by <a href="https://github.com/tamm">@tamm</a>. Country data from
      <a href="https://countries.trevorblades.com/"
        >countries.trevorblades.com</a
      >.
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Countries from "./components/Countries.vue"

export default {
  name: "app",
  components: {
    Countries,
  },
  computed: {
    ...mapState({
      settings: state => state.settings,
    }),
  },
  methods: {
    ...mapActions(["updateSettings"]),
    async changeSetting() {
      try {
        await this.updateSettings(this.settings)
      } catch (error) {
        console.log("Failed local state update", error)
      }
    },
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#logos {
  display: flex;
  align-items: center;
  justify-content: center;
}

#footer {
  border-top: 1px solid lightgrey;
  padding: 0.5em;
  margin: 1em;
}

a {
  color: #42b983;
}

.plus {
  padding: 0.5em;
  font-size: 3em;
  font-weight: bold;
}

h3 {
  margin: 40px 0 0;
}
</style>
