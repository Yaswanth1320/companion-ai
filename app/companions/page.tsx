import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import CompanionCard from "@/components/CompanionCard";
import { getCompanions } from "@/lib/actions/companions.actions";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

type CompanionRow = {
  id: string | number;
  name: string;
  subject: string;
  topic: string;
  duration: number;
  bookmarked?: boolean | null;
};

const CompanionLibrary = async ({ searchParams }: SearchParams) => {
  const resolved = await searchParams;
  const q = typeof resolved.q === "string" ? resolved.q : "";
  let companions: CompanionRow[] = [];
  try {
    companions = (await getCompanions({
      limit: 50,
      page: 1,
      query: q,
    })) as CompanionRow[];
  } catch {
    // noop: render empty state below
  }

  return (
    <main className="min-h-screen">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-4xl font-bold gradient-text">AI Companions</h1>
            <div className="flex w-full sm:w-auto items-center gap-3">
              <form action="/companions" className="flex w-full sm:w-80 gap-2">
                <Input
                  name="q"
                  defaultValue={q}
                  placeholder="Search companions..."
                  className="h-10"
                />
                <Button type="submit" variant="outline">
                  Search
                </Button>
              </form>
              <Button asChild>
                <Link href="/companions/build">Build Companion</Link>
              </Button>
            </div>
          </div>

          <div className="companion-list">
            <h2 className="text-2xl font-semibold mb-6">
              Available Companions
            </h2>
            <div className="companions-grid">
              {companions && companions.length > 0 ? (
                companions.map((c: CompanionRow) => (
                  <CompanionCard
                    key={c.id}
                    id={String(c.id)}
                    subject={c.subject}
                    name={c.name}
                    topic={c.topic}
                    duration={c.duration}
                    bookmarked={Boolean(c.bookmarked)}
                  />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                  <div className="rounded-border px-8 py-10 text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      No companions yet
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Create your first learning companion to get started.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CompanionLibrary;
