"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { registerSchema, RegisterSchemaT } from "./forms/register.schema";

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm<RegisterSchemaT>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit = async (data: RegisterSchemaT) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/processing");
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
          placeholder="Name"
          {...register("name")}
          error={errors.name?.message}
        />
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
        <Link href="/login" className="hover:underline ">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
