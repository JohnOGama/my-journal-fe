"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaT } from "./forms/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { authClient } from "@/libs/authClient";

const LoginPage = () => {
  const router = useRouter();

  const form = useForm<LoginSchemaT>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit = async (data: LoginSchemaT) => {
    try {
      // Cookie is automatically set by the server response
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Login failed:", error);
        return;
      }

      router.push("/processing");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center  space-y-4 max-w-sm mx-auto ">
      <div>
        <h1 className="text-xl font-semibold">Sign in to your account</h1>
        <p className="text-xs text-gray-400">
          Enter your email and password to sign in
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="john@example.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          placeholder="password@123"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button
          loading={isSubmitting}
          disabled={isSubmitting || !isDirty || !isValid}
          className="w-full"
        >
          Sign In with Email
        </Button>
      </form>

      <p className="text-xs text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="hover:underline ">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
