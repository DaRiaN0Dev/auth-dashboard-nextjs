"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthHeader } from "@/components/auth/auth-header";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { AUTH_ROUTES } from "@/constants/auth";
import { z } from "zod";
import { useAuthStore } from "@/store/auth-store";

const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { token: searchParams.get("token") || "" },
  });

  async function onSubmit(values: VerifyEmailFormValues) {
    setLoading(true);
    setMessage(null);
    try {
      await verifyEmail(values);
      setMessage("Email verified successfully.");
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <AuthHeader
        title="Verify email"
        description="Enter the verification token from your email."
        backlinkHref={AUTH_ROUTES.signIn}
        backlinkLabel="Back to sign in"
      />
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <FormField
          label="Verification token"
          htmlFor="token"
          error={form.formState.errors.token?.message}
        >
          <Input
            id="token"
            placeholder="Enter your verification token"
            {...form.register("token")}
          />
        </FormField>
        {message ? <Alert variant="success">{message}</Alert> : null}
        <Button type="submit" className="w-full" loading={loading}>
          Verify email
        </Button>
      </form>
    </Card>
  );
}
