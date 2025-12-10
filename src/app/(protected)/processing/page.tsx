"use client";
import AppProcessingPage from "@/components/AppProcessingPage";
import { authClient } from "@/libs/authClient";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const ProcessingPage = () => {
  const router = useRouter();

  const getSession = useCallback(async () => {
    try {
      // Session cookie is automatically sent with the request
      const session = await authClient.getSession();

      if (session?.error || !session?.data?.user) {
        router.push("/login");
        return;
      }

      router.push("/");
    } catch {
      router.push("/login");
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
