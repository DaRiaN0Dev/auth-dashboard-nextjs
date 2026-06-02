"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthHeader } from "@/components/auth/auth-header";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { PasswordInput } from "@/components/ui/password-input";
import { AUTH_ROUTES } from "@/constants/auth";
import { calculatePasswordScore } from "@/lib/auth/password";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/schemas/auth";
import { useAuthStore } from "@/store/auth-store";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const token = searchParams.get("token") ?? "default-reset-token";
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: "", confirmPassword: "" },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    setLoading(true);
    try {
      await resetPassword(values);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <AuthHeader
        title="Reset password"
        description="Choose a new secure password for your account."
        backlinkHref={AUTH_ROUTES.signIn}
        backlinkLabel="Back to sign in"
      />
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FormField
          label="New password"
          htmlFor="password"
          error={form.formState.errors.password?.message}
        >
          <PasswordInput
            id="password"
            autoComplete="new-password"
            {...form.register("password")}
          />
        </FormField>
        <PasswordStrength
          score={calculatePasswordScore(form.watch("password"))}
        />
        <FormField
          label="Confirm password"
          htmlFor="confirmPassword"
          error={form.formState.errors.confirmPassword?.message}
        >
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            {...form.register("confirmPassword")}
          />
        </FormField>
        {success ? (
          <Alert variant="success">
            Password reset completed successfully.
          </Alert>
        ) : null}
        <Button type="submit" className="w-full" loading={loading}>
          Update password
        </Button>
      </form>
    </Card>
  );
}
