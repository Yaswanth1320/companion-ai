"use client";

import { useParams } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CompanionSession = () => {
  const { id } = useParams();

  return (
    <main className="min-h-screen">
      <div className="flex h-screen">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/companions">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 10L5 10M5 10L10 15M5 10L10 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold gradient-text">{id}</h1>
                <p className="text-sm text-muted-foreground">
                  AI Learning Companion
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2V14M2 8H14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                New Session
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Welcome Message */}
              <div className="companion-card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2C11.1 2 12 2.9 12 4C12 5.1 11.1 6 10 6C8.9 6 8 5.1 8 4C8 2.9 8.9 2 10 2ZM16 8V6H14V8H16ZM6 8V6H4V8H6ZM10 18C8.9 18 8 17.1 8 16C8 14.9 8.9 14 10 14C11.1 14 12 14.9 12 16C12 17.1 11.1 18 10 18Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">
                      Welcome to your learning session!
                    </h3>
                    <p className="text-muted-foreground">
                      I m here to help you learn and grow. What would you like
                      to explore today?
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for chat messages */}
              <div className="text-center text-muted-foreground">
                <p>Your conversation will appear here</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-border bg-background/80 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Type your message or question..."
                  className="input flex-1"
                />
                <Button>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 8L15 8M8 1L15 8L8 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-border bg-card/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Session Info</h3>
          <div className="space-y-4">
            <div className="companion-card">
              <h4 className="font-medium mb-2">Current Topic</h4>
              <p className="text-sm text-muted-foreground">
                Getting started with {id}
              </p>
            </div>

            <div className="companion-card">
              <h4 className="font-medium mb-2">Progress</h4>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">25% complete</p>
            </div>

            <div className="companion-card">
              <h4 className="font-medium mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2V14M2 8H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Start Quiz
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2V14M2 8H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Practice Exercise
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanionSession;
