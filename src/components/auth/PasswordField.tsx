"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import TextField from "./TextField";

type PasswordFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type"
> & {
  id: string;
  label: string;
  icon?: ReactNode;
  error?: string;
  hint?: string;
};

const PasswordField = ({
  id,
  label,
  icon,
  error,
  hint,
  ...inputProps
}: PasswordFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      {...inputProps}
      id={id}
      label={label}
      icon={icon}
      error={error}
      hint={hint}
      type={isVisible ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#190C24]/45 transition hover:bg-black/5 hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E]"
        >
          {isVisible ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M3 3l18 18" />
              <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
              <path d="M9.4 5.4A10.4 10.4 0 0 1 12 5c5 0 8.5 4.4 9.5 7-.4 1-1.2 2.3-2.3 3.5" />
              <path d="M6.1 6.1C4 7.6 2.7 9.7 2.5 12c1 2.6 4.5 7 9.5 7 1.5 0 2.9-.4 4.1-1.1" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M2.5 12C3.5 9.4 7 5 12 5s8.5 4.4 9.5 7c-1 2.6-4.5 7-9.5 7s-8.5-4.4-9.5-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      }
    />
  );
};

export default PasswordField;
