"use client";

import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { UserProvider } from "./UserProvider";
import NuqsAdapterProvider from "./NuqsAdapter";
import { ThemeProvider } from "./ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ReactQueryProvider>
        <NuqsAdapterProvider>
          <UserProvider>{children}</UserProvider>
        </NuqsAdapterProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
