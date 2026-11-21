import type { InputHTMLAttributes, ReactNode } from "react";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  icon?: ReactNode;
  error?: string;
  hint?: string;
  trailing?: ReactNode;
};

const TextField = ({
  id,
  label,
  icon,
  error,
  hint,
  trailing,
  className = "",
  ...inputProps
}: TextFieldProps) => {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-[#190C24]"
      >
        {label}
      </label>

      <div className="relative">
        {icon ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-[#190C24]/40"
          >
            {icon}
          </span>
        ) : null}

        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`h-12 w-full rounded-xl border bg-white text-sm text-[#190C24] outline-none transition placeholder:text-[#190C24]/35 focus:border-[#D81B7E] focus:ring-4 focus:ring-[#D81B7E]/10 disabled:cursor-not-allowed disabled:bg-[#190C24]/5 ${
            icon ? "pl-11" : "pl-3.5"
          } ${trailing ? "pr-11" : "pr-3.5"} ${
            error ? "border-red-400" : "border-black/10"
          } ${className}`}
          {...inputProps}
        />

        {trailing ? (
          <span className="absolute inset-y-0 right-0 flex w-11 items-center justify-center">
            {trailing}
          </span>
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-[#190C24]/50">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

export default TextField;
