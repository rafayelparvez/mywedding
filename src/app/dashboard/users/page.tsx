"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: "user" | "vendor" | "admin";
  image?: string | null;
  createdAt: Date;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users from the API
  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch("/api/admin/users", {
          cache: "no-store",
        });
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err instanceof Error ? err.message : "Failed to load users");
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <p className="text-lg text-[#190C24]">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#D81B7E]/20 px-4 py-2 text-sm font-medium text-[#D81B7E] hover:bg-[#D81B7E]/30 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Topbar */}
      <header
        className="border-b border-black/10 bg-white sticky top-0 z-10 shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/"
              aria-label="MyWedding — Plan your wedding, your way"
              className="flex items-center gap-2"
            >
              <Image
                src="/images/MyWedding-Logo-dark.png"
                alt="MyWedding"
                width={40}
                height={40}
                className="h-6 w-6"
              />
              <span className="text-[13px] font-medium text-[#190C24]">
                MyWedding
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#190C24]">
              Manage Users
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#190C24]">
            Registered Users
          </h2>
          <p className="text-[#190C24]/60 text-sm">
            Total: {users.length}
          </p>
        </div>

        {users.length === 0 ? (
          <div className="p-8 text-center text-[#190C24]/60">
            <p>No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left p-3 text-xs font-medium text-[#190C24] uppercase tracking-[0.1em]">
                    Name
                  </th>
                  <th className="text-left p-3 text-xs font-medium text-[#190C24] uppercase tracking-[0.1em]">
                    Email
                  </th>
                  <th className="text-left p-3 text-xs font-medium text-[#190C24] uppercase tracking-[0.1em]">
                    Role
                  </th>
                  <th className="text-left p-3 text-xs font-medium text-[#190C24] uppercase tracking-[0.1em]">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-black/10 hover:bg-[#F9FAFB]"
                  >
                    <td className="p-3">
                      {user.image
                        ? (
                          <Image
                            src={user.image}
                            alt={user.name || "User"}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        )
                        : (
                          <span className="text-sm font-medium text-[#190C24]">
                            {user.name || "Unknown"}
                          </span>
                        )}
                    </td>
                    <td className="p-3 line-clamp-1">
                      <a
                        href={`mailto:${user.email}`}
                        className="text-[#190C24] hover:text-[#D81B7E] transition-colors"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          user.role === "admin"
                            ? "inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-medium bg-[#FA4796]/10 text-[#FA4796]"
                            : user.role === "vendor"
                              ? "inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-medium bg-[#FA4796]/10 text-[#FA4796]"
                              : "inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-medium bg-[#10B981]/10 text-[#10B981]"
                        }
                      >
                        {user.role === "admin"
                          ? "Admin"
                          : user.role === "vendor"
                            ? "Vendor"
                            : "User"}
                      </span>
                    </td>
                    <td className="p-3">
                      <p className="text-xs text-[#190C24]/60">
                        {user.createdAt.toLocaleDateString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}