import { Client, cacheExchange, fetchExchange } from "@urql/core";

export const client = new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

// const QUERY = `
//   query Test($id: ID!) {
//     getUser(id: $id) {
//       id
//       name
//     }
//   }
// `;

// client
//   .query(QUERY, { id: 'test' })
//   .toPromise()
//   .then(result => {
//     console.log(result); // { data: ... }
//   });
