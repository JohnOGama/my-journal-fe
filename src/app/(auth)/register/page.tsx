"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { registerSchema, RegisterSchemaT } from "./forms/register.schema";
import { authClient } from "@/libs/authClient";
import { ROUTES } from "@/features/route";
import { toast } from "sonner";

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
    try {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      router.push(ROUTES.LOGIN);
      toast.success("Registration successful");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-center space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Create your account</h1>
        <p className="text-xs text-gray-400">
          Enter your details to create an account
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
          Create Account
        </Button>
      </form>

      <p className="text-xs text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
