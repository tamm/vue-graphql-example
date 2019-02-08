import { apiRequest } from "@/apiRequest"
import gql_COUNTRIES from "../graphql/Countries.gql"

export const actions = {
  getCountries({ commit }) {
    const variables = {}
    return apiRequest(gql_COUNTRIES, variables).then(data => {
      if (data.countries.errors == null) {
        console.log("Get Countries done.", data.countries)

        commit("updateCountries", data.countries)
      }

      return data
    })
  },
  updateSettings({ commit }, settings) {
    commit("updateSettings", settings)
  },
}
