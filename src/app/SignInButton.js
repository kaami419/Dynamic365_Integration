import { useMsal } from "@azure/msal-react";
import { useRouter } from 'next/navigation';
import { storeUserDetails } from "./helpers/user";
// import jwtDecode from "jwt-decode";

export default function SignInButton() {
  const { instance } = useMsal();
  const router = useRouter();


  const handleLogin = async () => {
    try {
      // Step 1: Login the user
      const loginResponse = await instance.loginPopup({
        // scopes: ["https://20b860ba-a05b-4d47-8994-29110a5aa7d1.dynamics.com/.default"], // Use a generic scope to start
      });
      console.log("Login response:", loginResponse);
      
      
      const accessToken = loginResponse.accessToken;

      // Step 2: Decode token to get the tenant ID
      // const decodedToken = jwtDecode(accessToken);
      const tenantId = loginResponse.tenantId; // Tenant ID
      const userEmail = loginResponse.account.username;

      // Step 3: Construct the Dynamics URL dynamically
      const dynamicsUrl = `https://${tenantId}.crm.dynamics.com`;

      await storeUserDetails(userEmail, accessToken, dynamicsUrl);

      // Step 4: Save the token, Dynamics URL, and email to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("dynamicsUrl", dynamicsUrl);
      localStorage.setItem("userEmail", userEmail);

      alert("Login successful!");
      window.location.reload();
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return <button onClick={handleLogin}>Sign In with Microsoft</button>;
}
