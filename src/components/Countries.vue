<template>
  <div class="hello">
    <ul>
      <li v-for="country in countries" v-bind:key="country.code">
        <a v-bind:href="`https://en.wikipedia.org/wiki/${country.name}`">
          <span class="flag" v-if="settings.showFlags">
            {{ country.emoji }}
          </span>
          <span class="country-name">{{ country.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "Countries",
  beforeMount() {
    this.$store.dispatch("getCountries")
  },
  computed: {
    ...mapState({
      countries: state => state.countries,
      settings: state => state.settings,
    }),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 0 1em;
}
a {
  text-decoration: none;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.flag {
  margin-right: 1rem;
  margin-bottom: -0.3em;
  font-size: 3em;
}
a:hover .country-name {
  color: #000;
  text-decoration: underline;
}
</style>
