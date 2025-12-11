"use client";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const NuqsAdapterProvider = ({ children }: { children: React.ReactNode }) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};

export default NuqsAdapterProvider;
