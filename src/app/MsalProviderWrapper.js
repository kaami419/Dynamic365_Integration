"use client";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/app/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export default function MsalProviderWrapper({ children }) {
    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
}
