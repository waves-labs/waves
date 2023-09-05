import { Client, cacheExchange, fetchExchange } from "urql";

export const graphClient = new Client({
  url:
    import.meta.env.GRAPH_URL ??
    "https://api.studio.thegraph.com/query/51465/waves-base-goerli/version/latest",
  exchanges: [cacheExchange, fetchExchange],
});
