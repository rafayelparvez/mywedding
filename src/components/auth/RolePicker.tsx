import type { RegistrationRole } from "@/lib/roles";

type RolePickerProps = {
  value: RegistrationRole;
  onChange: (role: RegistrationRole) => void;
  disabled?: boolean;
};

const options = [
  {
    value: "user",
    title: "User",
    description: "I'm planning my wedding and looking for inspiration.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M12 20.5s-7.2-4.6-9.6-8.7C.8 8.5 2 5 5.2 4a5.2 5.2 0 0 1 6.8 2 5.2 5.2 0 0 1 6.8-2c3.2 1 4.4 4.5 2.8 7.8-2.4 4.1-9.6 8.7-9.6 8.7Z" />
      </svg>
    ),
  },
  {
    value: "vendor",
    title: "Vendor",
    description: "I offer wedding services and want to reach couples.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M4 10v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9" />
        <path d="M3 10l2-6h14l2 6" />
        <path d="M3 10a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2" />
        <path d="M9 20v-5h6v5" />
      </svg>
    ),
  },
] as const;

const RolePicker = ({ value, onChange, disabled = false }: RolePickerProps) => {
  return (
    <fieldset disabled={disabled}>
      <legend className="mb-2 block text-sm font-medium text-[#190C24]">
        Account type
      </legend>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className={`relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition focus-within:ring-4 focus-within:ring-[#D81B7E]/10 ${
                isSelected
                  ? "border-[#D81B7E] bg-[#D81B7E]/5 shadow-sm"
                  : "border-black/10 bg-white hover:border-[#D81B7E]/40 hover:bg-[#D81B7E]/[0.02]"
              } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <input
                type="radio"
                name="role"
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                disabled={disabled}
                className="sr-only"
              />

              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                  isSelected
                    ? "bg-[#D81B7E] text-white"
                    : "bg-[#190C24]/5 text-[#190C24]/55"
                }`}
              >
                {option.icon}
              </span>

              <span className="min-w-0 pr-5">
                <span className="block text-sm font-semibold text-[#190C24]">
                  {option.title}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-[#190C24]/55">
                  {option.description}
                </span>
              </span>

              <span
                aria-hidden="true"
                className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border transition ${
                  isSelected
                    ? "border-[#D81B7E] bg-[#D81B7E] text-white"
                    : "border-black/15 bg-white text-transparent"
                }`}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <path d="m4 10.5 4 4 8-9" />
                </svg>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default RolePicker;
