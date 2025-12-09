"use client";
import AppProcessingPage from "@/components/AppProcessingPage";
import { authClient } from "@/libs/authClient";
import { authStorage } from "@/libs/authStorage";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const ProcessingPage = () => {
  const router = useRouter();

  const getSession = useCallback(async () => {
    // First check if we have a token in localStorage
    const token = authStorage.getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const session = await authClient.getSession();

      if (session?.error) {
        authStorage.removeToken();
        router.push("/login");
        return;
      }

      if (session?.data?.user) {
        router.push("/");
      }
    } catch {
      authStorage.removeToken();
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
