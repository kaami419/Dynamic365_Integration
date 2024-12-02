"use client";
import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import createApolloClient from "./apollo-client";
import { ApolloProvider, useQuery } from "@apollo/client";
import { GET_DATA } from "./graphql/queries";
import jwtDecode from "jwt-decode";
import { storeUserDetails } from "./helpers/user";
import SignInButton from "./SignInButton";

export default function Home() {
  const { instance, accounts } = useMsal();
  const [apolloConfig, setApolloConfig] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      console.log("accounts", accounts);
      console.log("account.length", accounts.length);
      console.log("instance", instance);
      const storedAccessToken = localStorage.getItem("accessToken");
      
      try {
        if (storedAccessToken && accounts.length > 0) {
          const response = await instance.acquireTokenSilent({
            scopes: [`https://${localStorage.getItem("dynamicsUrl") || "placeholder"}/.default`],
            account: accounts[0],
          });

          console.log("Token fetched successfully", response);

          const decodedToken = jwtDecode(response.accessToken);
          const tenantId = response.tenantId; // Extract tenant ID
          const dynamicsUrl = `https://${tenantId}.crm.dynamics.com`; // Construct tenant-specific Dynamics URL

          await storeUserDetails(decodedToken.preferred_username, response.accessToken, dynamicsUrl);

          setApolloConfig({
            accessToken: response.accessToken,
            dynamicsUrl,
          });
          setIsAuthenticated(true);
          
        }
      } catch (error) {
        console.log("Token fetch failed", error);
        setIsAuthenticated(false);
      }
    };

    const fetchData = async () => {
      const dynamicsUrl = localStorage.getItem("dynamicsUrl");
      const accessToken = localStorage.getItem("accessToken");
    
      const response = await fetch(`${dynamicsUrl}/api/data/v9.0/accounts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    
      const data = await response.json();
      console.log("response from fetchData is", data);
    };

    fetchToken();
    fetchData();
  }, [instance, accounts]);

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Please sign in to continue</h1>
        <SignInButton />
      </div>
    );
  }

  if (!apolloConfig) return <p>Loading...</p>;

  const client = createApolloClient(apolloConfig.accessToken, apolloConfig.dynamicsUrl);
  return (
    <ApolloProvider client={client}>
      <DataFetcher />
    </ApolloProvider>
  );
}

function DataFetcher() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>GraphQL Data</h1>
      <ul>
        {data.data.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


