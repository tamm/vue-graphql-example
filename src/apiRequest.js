import { GraphQLClient } from "graphql-request"
import { print } from "graphql/language/printer"
import gql from "graphql-tag"

const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP || "https://countries.trevorblades.com/"

let authToken = false
let graphQLClient = new GraphQLClient(httpEndpoint, {
  headers: {
    authorization: false,
  },
})

export function updateToken(token) {
  // This needs to comply with the token format of your backend
  authToken = token ? `JWT ${token}` : null
  graphQLClient.setHeader("authorization", authToken)
}

export async function apiRequest(query, variables) {
  // In case input happens to come as a string,
  // convert it to graphql-tag and then back,
  // rather than just pass through and get error
  if (typeof query == "string") {
    query = gql`
      ${query}
    `
  }
  const queryString = print(query)

  return graphQLClient.request(queryString, variables)
  // TODO: General error handling
}
