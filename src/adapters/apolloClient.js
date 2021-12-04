import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const runQuery = async (query) => {
  try {
    const client = new ApolloClient({
      uri: "http://localhost:4000",
      cache: new InMemoryCache(),
    });

    const gqlQuery = gql`
      ${query}
    `;
    const response = await client.query({ query: gqlQuery });
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  } catch (err) {
    return {
      error: err,
    };
  }
};
