export const USER_ROLES = ["user", "vendor", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

/** Roles the public registration form is allowed to create. */
export const REGISTRATION_ROLES = ["user", "vendor"] as const;

export type RegistrationRole = (typeof REGISTRATION_ROLES)[number];

export const DEFAULT_USER_ROLE: UserRole = "user";

export const ROLE_LABELS: Record<UserRole, string> = {
  user: "User",
  vendor: "Vendor",
  admin: "Admin",
};

export function isRegistrationRole(value: unknown): value is RegistrationRole {
  return value === "user" || value === "vendor";
}
