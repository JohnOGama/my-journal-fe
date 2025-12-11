"use client";
import AppProcessingPage from "@/components/AppProcessingPage";
import { ROUTES } from "@/features/route";
import { authClient } from "@/libs/authClient";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const ProcessingPage = () => {
  const router = useRouter();

  const getSession = useCallback(async () => {
    const session = await authClient.getSession();
    if (session?.data?.user) {
      router.push(ROUTES.HOME);
    }
  }, [router]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <AppProcessingPage
        title="Processing your account"
        description="We are processing your account. Please wait..."
      />
    </div>
  );
};

export default ProcessingPage;
