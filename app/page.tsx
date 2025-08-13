import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Page = () => {
  return (
    <main>
      {/* Hero */}
      <section className="w-full py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 bg-primary/10 text-primary text-sm font-semibold">
            Smarter learning, made simple
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight gradient-text">
            Learn with AI Companions
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Personal guidance, interactive sessions, and progress insights
            tailored to the way you learn.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/companions">Explore Companions</Link>
            </Button>
            <SignedOut>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
          <div className="mt-10 sm:mt-12">
            <Image
              src="/images/cta.svg"
              alt="AI learning illustration"
              width={1000}
              height={500}
              className="mx-auto w-full h-auto max-w-3xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            Why Choose TeachStream?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="companion-card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Personalized Learning
              </h3>
              <p className="text-muted-foreground">
                AI companions that adapt to your learning style and pace.
              </p>
            </div>

            <div className="companion-card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                    fill="white"
                  />
                  <path
                    d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Interactive Sessions
              </h3>
              <p className="text-muted-foreground">
                Real-time conversations and interactive learning experiences.
              </p>
            </div>

            <div className="companion-card text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Progress Tracking
              </h3>
              <p className="text-muted-foreground">
                Monitor your learning progress and achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="w-full py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Popular Subjects
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: "/icons/maths.svg", label: "Maths" },
              { icon: "/icons/science.svg", label: "Science" },
              { icon: "/icons/language.svg", label: "Language" },
              { icon: "/icons/economics.svg", label: "Economics" },
              { icon: "/icons/coding.svg", label: "Coding" },
              { icon: "/icons/cap.svg", label: "General" },
            ].map(({ icon, label }) => (
              <Link
                key={label}
                href="/companions"
                className="rounded-border p-4 sm:p-5 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <Image
                  src={icon}
                  alt={label}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-sm sm:text-base font-medium">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full pb-16 pt-4">
        <div className="max-w-8xl mx-auto">
          <div className="cta-section mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold">
              Start learning with your AI companion
            </h3>
            <p className="text-white/80 max-w-xl">
              Create your personalized companion or choose from our library and
              begin your journey today.
            </p>
            <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-xs mx-auto">
              <SignedOut>
                <Button
                  asChild
                  size="lg"
                  className="btn-primary w-full min-w-[200px] transition-transform duration-200 hover:scale-[1.02]"
                >
                  <Link
                    href="/dashboard"
                    className="w-full flex items-center justify-center"
                  >
                    Get Started
                  </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  asChild
                  size="lg"
                  className="btn-primary w-full min-w-[200px] transition-transform duration-200 hover:scale-[1.02]"
                >
                  <Link
                    href="/companions/build"
                    className="w-full flex items-center justify-center"
                  >
                    Build Companion
                  </Link>
                </Button>
              </SignedIn>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full min-w-[200px] transition-transform duration-200 hover:scale-[1.02] text-black dark:text-white border-gray-300 dark:border-gray-600"
              >
                <Link
                  href="/companions"
                  className="w-full flex items-center justify-center"
                >
                  Explore Companions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
