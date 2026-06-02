"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthHeader } from "@/components/auth/auth-header";
import { PasswordStrength } from "@/components/auth/password-strength";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { AUTH_ROUTES } from "@/constants/auth";
import { calculatePasswordScore } from "@/lib/auth/password";
import { signUpSchema, type SignUpFormValues } from "@/schemas/auth";
import { useAuthStore } from "@/store/auth-store";

export default function SignUpPage() {
  const router = useRouter();
  const signUp = useAuthStore((state) => state.signUp);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    clearError();
    setSuccess(null);
    setLoading(true);
    try {
      await signUp(values);
      setSuccess("Account created. Verify your email to continue.");
      router.push(AUTH_ROUTES.verifyEmail);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <AuthHeader
        title="Create account"
        description="Set up secure access in less than a minute."
        backlinkHref={AUTH_ROUTES.signIn}
        backlinkLabel="Back to sign in"
      />
      <form
        className="space-y-4"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField
            label="First name"
            htmlFor="firstName"
            error={form.formState.errors.firstName?.message}
          >
            <Input
              id="firstName"
              autoComplete="given-name"
              {...form.register("firstName")}
            />
          </FormField>
          <FormField
            label="Last name"
            htmlFor="lastName"
            error={form.formState.errors.lastName?.message}
          >
            <Input
              id="lastName"
              autoComplete="family-name"
              {...form.register("lastName")}
            />
          </FormField>
        </div>
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
        <Checkbox
          label="I agree to the Terms and Privacy Policy."
          {...form.register("acceptedTerms")}
        />
        {form.formState.errors.acceptedTerms ? (
          <Alert variant="error">
            {form.formState.errors.acceptedTerms.message}
          </Alert>
        ) : null}
        {error ? <Alert variant="error">{error}</Alert> : null}
        {success ? <Alert variant="success">{success}</Alert> : null}
        <Button type="submit" className="w-full" loading={loading}>
          Create account
        </Button>
        <p className="text-muted text-center text-sm leading-6 text-balance">
          Already have an account?{" "}
          <Link
            href={AUTH_ROUTES.signIn}
            className="text-foreground focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Card>
  );
}
