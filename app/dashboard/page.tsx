import React from "react";
import Link from "next/link";
import Image from "next/image";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor, recentSessions } from "@/constants";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import {
  getCompanions,
  getRecentSessions,
} from "@/lib/actions/companions.actions";
import CompanionsList from "@/components/CompanionList";
import Cta from "@/components/CTA";

export const dynamic = "force-dynamic"; // forces runtime rendering

const Dashboard = async () => {
  const companions = await getCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);
 
  return (
    <>
      <SignedIn>
        <main>
          {/* Hero Section with Cards */}
          <section className="w-full py-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                Dashboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track your learning progress and discover new AI companions
              </p>
            </div>

            <div className="companions-grid">
              {companions.map((companion) => (
                <CompanionCard
                  key={companion.id}
                  {...companion}
                  color={getSubjectColor(companion.subject)}
                />
              ))}
            </div>
          </section>

          {/* Recently Completed Lessons & Companion Builder */}
          <section className="w-full py-8 gap-10 flex flex-row items-start max-lg:flex-col">
            <CompanionsList
              title="Recently completed sessions"
              companions={recentSessionsCompanions}
              classNames="w-2/3 max-lg:w-full"
            />
            <Cta />
          </section>
        </main>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Dashboard;
