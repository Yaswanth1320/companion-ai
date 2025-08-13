import React from "react";
import Link from "next/link";
import Image from "next/image";
import CompanionCard from "@/components/CompanionCard";
import { recentSessions } from "@/constants";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const subjectIconMap: Record<string, string> = {
  maths: "/icons/maths.svg",
  language: "/icons/language.svg",
  science: "/icons/science.svg",
  history: "/icons/history.svg",
  coding: "/icons/coding.svg",
  economics: "/icons/economics.svg",
};

const Dashboard = () => {
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
              {recentSessions.slice(0, 3).map((item) => (
                <div key={item.id} className="w-full">
                  <CompanionCard
                    id={item.id}
                    subject={item.subject}
                    name={item.name}
                    topic={item.topic}
                    duration={item.duration}
                    color={item.color}
                    bookmarked={false}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Recently Completed Lessons & Companion Builder */}
          <section className="w-full py-12">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Recently Completed Lessons */}
              <div className="xl:col-span-2">
                <div className="bg-card rounded-3xl border border-border/50 shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Recently completed lessons
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {recentSessions.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-gradient-to-r from-background to-card/30 hover:border-border/50 transition-all duration-300"
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                          style={{ backgroundColor: item.color }}
                        >
                          <Image
                            src={
                              subjectIconMap[item.subject] || "/icons/cap.svg"
                            }
                            alt={item.subject}
                            width={22}
                            height={22}
                            className="text-white"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-foreground mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Topic: {item.topic}
                          </p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-1">
                          <span className="bg-black text-white rounded-full text-xs px-3 py-1 capitalize font-medium shadow">
                            {item.subject}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.duration} mins
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Companion Builder CTA */}
              <div className="xl:col-span-1">
                <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary text-white rounded-3xl p-8 flex flex-col items-center text-center gap-6 shadow-xl">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Create Your Own Companion
                    </h3>
                    <p className="text-white/80">
                      Build a personalized AI learning companion tailored to
                      your needs and preferences
                    </p>
                  </div>
                  <Link
                    href="/companions/build"
                    className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Build Companion
                  </Link>
                </div>
              </div>
            </div>
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
