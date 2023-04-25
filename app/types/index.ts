import { User } from ".prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerify"> & {
  createdAt: string;
  updatedAt: string;
  emailVerify: string | null;
};
