
// "use client";
// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// const createApolloClient = (token) => {
//   return new ApolloClient({
//     link: new HttpLink({
//       uri: process.env.DYNAMICS_URL,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }),
//     cache: new InMemoryCache(),
//   });
// };

// export default createApolloClient;


"use client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = (token, dynamicsUrl) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${dynamicsUrl}/api/data/v9.0/`, // Construct the Dynamics API endpoint dynamically
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
