import React from "react";
import { getCompanion } from "@/lib/actions/companions.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/constants";
import Image from "next/image";
import CampanionBlock from "@/components/CampanionBlock";

interface CompanionSessionProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }
  if (!companion) {
    redirect("/companions");
  }

  return (
    <main>
      <article className="flex border rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(companion.subject) }}
          >
            <Image
              src={`/icons/${companion.subject}.svg`}
              alt={companion.name}
              width={35}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{companion.name}</p>
              <div
                className="subject-badge max-md:hidden"
                style={{ backgroundColor: getSubjectColor(companion.subject) }}
              >
                {companion.subject}
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{companion.topic}</p>
          </div>
        </div>
        <p className="items-start text-xl max-md:hidden">
          {companion.duration} minutes
        </p>
      </article>
      <CampanionBlock
        {...companion}
        companionId={id}
        userName={user?.firstName!}
        userImage={user?.imageUrl!}
      />
    </main>
  );
};

export default CompanionSession;
