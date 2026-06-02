"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { AuthHeader } from "@/components/auth/auth-header";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OTPInput } from "@/components/ui/otp-input";
import { AUTH_ROUTES, RESEND_SECONDS } from "@/constants/auth";
import { otpSchema, type OtpFormValues } from "@/schemas/auth";
import { useAuthStore } from "@/store/auth-store";

export default function VerifyEmailPage() {
  const router = useRouter();
  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  async function onSubmit(values: OtpFormValues) {
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
        description="Enter the 6-digit code sent to your inbox."
        backlinkHref={AUTH_ROUTES.signIn}
        backlinkLabel="Back to sign in"
      />
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          control={form.control}
          name="code"
          render={({ field }) => (
            <OTPInput value={field.value} onChange={field.onChange} />
          )}
        />
        {form.formState.errors.code ? (
          <Alert variant="error">{form.formState.errors.code.message}</Alert>
        ) : null}
        {message ? <Alert variant="success">{message}</Alert> : null}
        <Button type="submit" className="w-full" loading={loading}>
          Verify email
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          disabled={timer > 0}
          onClick={() => setTimer(RESEND_SECONDS)}
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend code"}
        </Button>
      </form>
    </Card>
  );
}
