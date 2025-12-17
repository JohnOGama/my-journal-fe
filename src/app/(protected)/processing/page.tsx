"use client";
import AppProcessingPage from "@/components/AppProcessingPage";
import { ROUTES } from "@/features/route";
import { authClient } from "@/libs/authClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProcessingPage = () => {
  const router = useRouter();

  useEffect(() => {
    let retryCount = 0;
    const MAX_RETRIES = 1;

    const getSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          router.push(ROUTES.HOME);
        }
      } catch {
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          setTimeout(() => {
            getSession();
          }, 1000);
        }
      }
    };

    getSession();
  }, [router]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <AppProcessingPage
        title="Processing your account"
        description="We are processing your account. Please wait..."
      />
    </div>
  );
};

export default ProcessingPage;
