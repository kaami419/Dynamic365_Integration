"use client";
export const msalConfig = {
    auth: {
      clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID}`,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    },
    cache: {
      cacheLocation: "sessionStorage", // or localStorage
      storeAuthStateInCookie: false,
    },
  };
  