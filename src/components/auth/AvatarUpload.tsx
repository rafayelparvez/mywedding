"use client";

import Image from "next/image";
import { useRef } from "react";

type AvatarUploadProps = {
  preview: string;
  onSelect: (file: File) => void;
  onClear: () => void;
  error?: string;
  disabled?: boolean;
};

const AvatarUpload = ({
  preview,
  onSelect,
  onClear,
  error,
  disabled = false,
}: AvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm font-medium text-[#190C24]">
          Profile picture
        </span>
        <span className="text-xs text-[#190C24]/45">Optional</span>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-dashed border-black/10 bg-[#FFF9FC] p-3 sm:p-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-white bg-[#190C24]/5 shadow-sm">
          {preview ? (
            <Image
              src={preview}
              alt="Profile picture preview"
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center text-[#190C24]/30"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
              </svg>
            </span>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#D81B7E]/30 bg-white px-4 py-1.5 text-xs font-semibold text-[#D81B7E] transition hover:border-[#D81B7E]/60 hover:bg-[#D81B7E]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {preview ? "Change photo" : "Upload photo"}
            </button>

            {preview ? (
              <button
                type="button"
                onClick={onClear}
                disabled={disabled}
                className="inline-flex min-h-9 items-center justify-center rounded-full px-2 py-1.5 text-xs font-medium text-[#190C24]/55 transition hover:text-[#D81B7E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D81B7E] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove
              </button>
            ) : null}
          </div>

          <p className="mt-2 text-xs leading-relaxed text-[#190C24]/50">
            JPG, PNG or WebP. Max 4 MB.
          </p>

          {error ? (
            <p role="alert" className="mt-1 text-xs text-red-600">
              {error}
            </p>
          ) : null}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        disabled={disabled}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onSelect(file);
          }
          event.target.value = "";
        }}
      />
    </div>
  );
};

export default AvatarUpload;
