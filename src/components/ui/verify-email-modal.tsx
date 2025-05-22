"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "./card";
import { Input } from "./input";
import { Button } from "./button";
import { Label } from "./label";

interface VerifyEmailModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
}

export function VerifyEmailModal({ open, email, onClose }: VerifyEmailModalProps) {
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);
  const [resendMessage, setResendMessage] = React.useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Verification failed");
      } else {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResendMessage(data.error || "Failed to resend code");
      } else {
        setResendMessage("Verification code resent!");
      }
    } catch (err) {
      setResendMessage("Network error");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v: boolean) => { if (!v) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Email Verification</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to <span className="font-semibold">{email}</span>.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleVerify}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && <p className="text-sm text-green-500">Email verified!</p>}
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Verify"}
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={handleResend} disabled={resendLoading}>
                  {resendLoading ? "Resending..." : "Resend Code"}
                </Button>
                {resendMessage && <p className="text-sm text-center text-muted-foreground">{resendMessage}</p>}
              </CardFooter>
            </form>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 