"use client";

import React from "react";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserProfile,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <>
      <SignedIn>
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12 px-6 sm:px-8 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                Your Profile
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-3xl border border-border/50 shadow-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/dashboard">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                          />
                        </svg>
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/companions">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        My Companions
                      </Button>
                    </Link>
                    <Link href="/companions/build">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
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
                        Build New Companion
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Clerk User Profile */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-3xl border border-border/50 shadow-xl p-6">
                  <h3 className="text-xl font-semibold mb-6">
                    Account Settings
                  </h3>
                  <UserProfile
                    appearance={{
                      elements: {
                        rootBox: "w-full",
                        card: "shadow-none border-none bg-transparent",
                        pageScrollBox: "p-0",
                        navbar: "hidden",
                        pageContent: "p-0",
                        formButtonPrimary:
                          "bg-primary hover:bg-primary/90 text-white",
                        formButtonReset:
                          "bg-secondary hover:bg-secondary/90 text-white",
                        formFieldInput:
                          "border-2 border-border focus:border-primary/50 transition-colors",
                        formFieldLabel: "text-foreground font-medium",
                        formFieldLabelRow: "mb-2",
                        formField: "mb-6",
                        dividerLine: "bg-border",
                        dividerText: "text-muted-foreground",
                        headerTitle: "text-2xl font-bold text-foreground",
                        headerSubtitle: "text-muted-foreground",
                        profileSection: "bg-background/50 rounded-xl p-4 mb-4",
                        profileSectionTitle:
                          "text-lg font-semibold text-foreground mb-3",
                        profileSectionContent: "space-y-3",
                        profileSectionRow:
                          "flex items-center justify-between py-2",
                        profileSectionRowLabel: "text-foreground font-medium",
                        profileSectionRowValue: "text-muted-foreground",
                        profileSectionRowButton:
                          "text-primary hover:text-primary/80 font-medium",
                        dangerZone:
                          "bg-destructive/10 border border-destructive/20 rounded-xl p-4",
                        dangerZoneTitle:
                          "text-lg font-semibold text-destructive mb-3",
                        dangerZoneDescription: "text-muted-foreground mb-4",
                        dangerZoneButton:
                          "bg-destructive hover:bg-destructive/90 text-white",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Additional Profile Sections */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Stats */}
              <div className="bg-card rounded-3xl border border-border/50 shadow-xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Learning Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Total Sessions
                    </span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Hours Learned</span>
                    <span className="font-semibold">12.5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Companions Created
                    </span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Favorite Subject
                    </span>
                    <span className="font-semibold">Mathematics</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card rounded-3xl border border-border/50 shadow-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">
                      Completed Calculus lesson
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      2h ago
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-muted-foreground">
                      Created new companion
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      1d ago
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-muted-foreground">
                      Started Physics session
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      3d ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProfilePage;
