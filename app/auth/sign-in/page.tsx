"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthHeader } from "@/components/auth/auth-header";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { AUTH_ROUTES } from "@/constants/auth";
import { signInSchema, type SignInFormValues } from "@/schemas/auth";
import { useAuthStore } from "@/store/auth-store";

export default function SignInPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const signIn = useAuthStore((state) => state.signIn);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  async function onSubmit(values: SignInFormValues) {
    clearError();
    setSuccess(null);
    setSubmitting(true);
    try {
      const result = await signIn(values);
      if (result.next === "verify-email") router.push(AUTH_ROUTES.verifyEmail);
      else {
        setSuccess("Sign in successful. Redirecting...");
        router.push("/");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <AuthHeader
        title="Sign in"
        description="Access your workspace securely."
      />
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FormField
          label="Email"
          htmlFor="email"
          error={form.formState.errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
          />
        </FormField>
        <FormField
          label="Password"
          htmlFor="password"
          error={form.formState.errors.password?.message}
        >
          <PasswordInput
            id="password"
            autoComplete="current-password"
            {...form.register("password")}
          />
        </FormField>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Checkbox label="Remember me" {...form.register("rememberMe")} />
          <Link
            href={AUTH_ROUTES.forgotPassword}
            className="text-foreground focus-visible:ring-ring inline-flex rounded-sm text-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Forgot password?
          </Link>
        </div>
        {error ? <Alert variant="error">{error}</Alert> : null}
        {success ? <Alert variant="success">{success}</Alert> : null}
        <Button type="submit" loading={submitting} className="w-full">
          Continue
        </Button>
        <p className="text-muted text-center text-sm leading-6 text-balance">
          New to the platform?{" "}
          <Link
            href={AUTH_ROUTES.signUp}
            className="text-foreground focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Create an account
          </Link>
        </p>
      </form>
    </Card>
  );
}
