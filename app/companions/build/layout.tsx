import { newCompanionPermissions } from "@/lib/actions/companions.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const canCreateCompanion = await newCompanionPermissions();
  console.log("Can create companion:", canCreateCompanion);
  return (
    <div className="container mx-auto py-4">
      {canCreateCompanion ? (
        <>
          <h1 className="text-4xl font-bold mb-2 text-center">
            Build a Companion
          </h1>
          {children}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <h1 className="text-2xl font-semibold text-red-500">
            Your plan limit reached
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Upgrade your plan to create more companions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Layout;
