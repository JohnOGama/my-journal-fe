"use client";

import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { UserProvider } from "./UserProvider";
import NuqsAdapterProvider from "./NuqsAdapter";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <NuqsAdapterProvider>
        <UserProvider>{children}</UserProvider>
      </NuqsAdapterProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
