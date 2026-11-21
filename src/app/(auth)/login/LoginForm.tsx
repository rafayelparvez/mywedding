"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import AuthShell from "@/components/auth/AuthShell";
import PasswordField from "@/components/auth/PasswordField";
import TextField from "@/components/auth/TextField";
import {
  GoogleIcon,
  LockIcon,
  MailIcon,
  SpinnerIcon,
} from "@/components/auth/icons";
import { signIn, useSession } from "@/lib/auth-client";

type FieldErrors = Partial<Record<"email" | "password", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = ({ googleEnabled }: { googleEnabled: boolean }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [isPending, router, session]);

  const clearError = (field: keyof FieldErrors) => {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next: FieldErrors = {};

    if (!email.trim()) {
      next.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Enter your password.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await signIn.email({
        email: email.trim().toLowerCase(),
        password,
        rememberMe,
        callbackURL: "/",
      });

      if (error) {
        setFormError(
          error.message || "That email and password combination didn't work.",
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError("");
    setIsGoogleLoading(true);

    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setFormError(
          error.message || "Google sign-in is unavailable right now.",
        );
        setIsGoogleLoading(false);
      }
    } catch {
      setFormError("Google sign-in is unavailable right now.");
      setIsGoogleLoading(false);
    }
  };

  const isBusy = isSubmitting || isGoogleLoading;

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your account"
      description="Pick up where you left off and keep planning your perfect day."
      footer={
        <>
          New to MyWedding?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#D81B7E] transition hover:text-[#B31668] hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <div className="space-y-5">
        {formError ? (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm leading-relaxed text-red-700"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 h-4 w-4 shrink-0"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5v5" />
              <path d="M12 16.5h.01" />
            </svg>
            <span>{formError}</span>
          </div>
        ) : null}

        {googleEnabled ? (
          <>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isBusy}
              className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[#190C24] transition hover:border-[#D81B7E]/40 hover:bg-[#D81B7E]/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGoogleLoading ? <SpinnerIcon /> : <GoogleIcon />}
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-black/10" />
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#190C24]/40">
                or continue with email
              </span>
              <span className="h-px flex-1 bg-black/10" />
            </div>
          </>
        ) : null}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <TextField
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearError("email");
            }}
            icon={<MailIcon />}
            error={errors.email}
            disabled={isBusy}
          />

          <PasswordField
            id="password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              clearError("password");
            }}
            icon={<LockIcon />}
            error={errors.password}
            disabled={isBusy}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2.5 text-sm text-[#190C24]/65">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                disabled={isBusy}
                className="h-4 w-4 rounded border-black/20 accent-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
              />
              Remember me
            </label>

            <Link
              href="/register"
              className="text-xs font-medium text-[#190C24]/45 transition hover:text-[#D81B7E]"
            >
              Need an account?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isBusy}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#D81B7E] via-[#E93A92] to-[#FA4796] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#D81B7E]/25 transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <SpinnerIcon /> : null}
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </AuthShell>
  );
};

export default LoginForm;
