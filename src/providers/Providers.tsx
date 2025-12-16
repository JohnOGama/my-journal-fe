"use client";

import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { UserProvider } from "./UserProvider";
import NuqsAdapterProvider from "./NuqsAdapter";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ReactQueryProvider>
        <NuqsAdapterProvider>
          <UserProvider>{children}</UserProvider>
          <Toaster position="bottom-left" />
        </NuqsAdapterProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
