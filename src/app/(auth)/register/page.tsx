"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import AuthShell from "@/components/auth/AuthShell";
import AvatarUpload from "@/components/auth/AvatarUpload";
import PasswordField from "@/components/auth/PasswordField";
import RolePicker from "@/components/auth/RolePicker";
import TextField from "@/components/auth/TextField";
import {
  LockIcon,
  MailIcon,
  SpinnerIcon,
  UserIcon,
} from "@/components/auth/icons";
import { signUp, useSession } from "@/lib/auth-client";
import { createAvatarDataUrl } from "@/lib/avatar";
import type { RegistrationRole } from "@/lib/roles";

type FieldErrors = Partial<
  Record<"name" | "email" | "password" | "confirmPassword" | "terms", string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [role, setRole] = useState<RegistrationRole>("user");
  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!name.trim()) {
      next.name = "Enter your full name.";
    } else if (name.trim().length < 2) {
      next.name = "Your name must be at least 2 characters.";
    }

    if (!email.trim()) {
      next.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Create a password.";
    } else if (password.length < 6) {
      next.password = "Use at least 6 characters.";
    } else if (!/[A-Z]/.test(password)) {
      next.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      next.password = "Password must contain at least one lowercase letter.";
    }

    if (!confirmPassword) {
      next.confirmPassword = "Confirm your password.";
    } else if (confirmPassword !== password) {
      next.confirmPassword = "Passwords do not match.";
    }

    if (!acceptedTerms) {
      next.terms = "Please accept the terms to continue.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleAvatarSelect = async (file: File) => {
    setAvatarError("");

    try {
      setAvatar(await createAvatarDataUrl(file));
    } catch (error) {
      setAvatarError(
        error instanceof Error
          ? error.message
          : "That image could not be processed.",
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        image: avatar || undefined,
        requestedRole: role,
        callbackURL: "/",
      });

      if (error) {
        setFormError(
          error.message || "We couldn't create your account. Please try again.",
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

  return (
    <AuthShell
      size="lg"
      eyebrow="Create your account"
      title="Start planning your perfect day"
      description="Join as a couple or a vendor — it only takes a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#D81B7E] transition hover:text-[#B31668] hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

        <RolePicker
          value={role}
          onChange={setRole}
          disabled={isSubmitting}
        />

        <AvatarUpload
          preview={avatar}
          onSelect={handleAvatarSelect}
          onClear={() => {
            setAvatar("");
            setAvatarError("");
          }}
          error={avatarError}
          disabled={isSubmitting}
        />

        <TextField
          id="name"
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Ava Thompson"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            clearError("name");
          }}
          icon={<UserIcon />}
          error={errors.name}
          disabled={isSubmitting}
        />

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
          disabled={isSubmitting}
        />

        <PasswordField
          id="password"
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            clearError("password");
          }}
          icon={<LockIcon />}
          error={errors.password}
          hint="At least 6 characters, one uppercase and one lowercase letter"
          disabled={isSubmitting}
        />

        <PasswordField
          id="confirm-password"
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            clearError("confirmPassword");
          }}
          icon={<LockIcon />}
          error={errors.confirmPassword}
          disabled={isSubmitting}
        />

        <div>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-[#190C24]/65">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => {
                setAcceptedTerms(event.target.checked);
                clearError("terms");
              }}
              disabled={isSubmitting}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 accent-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
            />
            <span>
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-[#D81B7E] hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-[#D81B7E] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {errors.terms ? (
            <p className="mt-1.5 text-xs text-red-600">{errors.terms}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#D81B7E] via-[#E93A92] to-[#FA4796] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#D81B7E]/25 transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? <SpinnerIcon /> : null}
          {isSubmitting
            ? "Creating account..."
            : role === "vendor"
              ? "Create vendor account"
              : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
};

export default RegisterPage;
