"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { AuthHeader } from "@/components/auth/auth-header";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { OTPInput } from "@/components/ui/otp-input";
import { AUTH_ROUTES } from "@/constants/auth";
import { otpSchema, type OtpFormValues } from "@/schemas/auth";
import { useAuthStore } from "@/store/auth-store";

export default function TwoFactorPage() {
  const verifyTwoFactor = useAuthStore((state) => state.verifyTwoFactor);
  const verifyRecoveryCode = useAuthStore((state) => state.verifyRecoveryCode);
  const [loading, setLoading] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  async function onSubmit(values: OtpFormValues) {
    setError(null);
    setLoading(true);
    try {
      await verifyTwoFactor(values);
    } catch {
      setError("Invalid authentication code.");
    } finally {
      setLoading(false);
    }
  }

  async function onRecoverySubmit() {
    if (!recoveryCode.trim()) {
      setError("Enter a recovery code.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await verifyRecoveryCode(recoveryCode.trim());
    } catch {
      setError("Recovery code invalid or already used.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <AuthHeader
        title="Two-factor verification"
        description="Enter your authenticator code or a recovery code."
        backlinkHref={AUTH_ROUTES.signIn}
        backlinkLabel="Back to sign in"
      />
      <form
        className="space-y-4"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="code"
          render={({ field }) => (
            <OTPInput value={field.value} onChange={field.onChange} />
          )}
        />
        {error ? <Alert variant="error">{error}</Alert> : null}
        <Button type="submit" className="w-full" loading={loading}>
          Verify code
        </Button>
      </form>
      <div className="border-border mt-5 space-y-3 border-t pt-4">
        <FormField label="Recovery code">
          <Input
            value={recoveryCode}
            onChange={(event) => setRecoveryCode(event.target.value)}
            placeholder="XXXX-XXXX-XXXX"
          />
        </FormField>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          loading={loading}
          onClick={onRecoverySubmit}
        >
          Use recovery code
        </Button>
      </div>
    </Card>
  );
}
