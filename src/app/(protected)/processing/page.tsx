"use client";
import AppProcessingPage from "@/components/AppProcessingPage";
import { authClient } from "@/libs/authClient";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const ProcessingPage = () => {
  const router = useRouter();

  const getSession = useCallback(async () => {
    const session = await authClient.getSession();

    if (session?.error) {
      router.push("/login");
      return;
    }

    if (session?.data?.user) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    <AppProcessingPage
      title="Processing your account"
      description="We are processing your account. Please wait..."
    />
  );
};

export default ProcessingPage;
