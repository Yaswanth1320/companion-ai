import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export type CompanionCardProps = {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number;
  color?: string;
  bookmarked?: boolean;
};

const subjectIconMap: Record<string, string> = {
  maths: "/icons/maths.svg",
  language: "/icons/language.svg",
  science: "/icons/science.svg",
  history: "/icons/history.svg",
  coding: "/icons/coding.svg",
  economics: "/icons/economics.svg",
};

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const CompanionCard: React.FC<CompanionCardProps> = ({
  id,
  subject,
  name,
  topic,
  duration,
  color,
  bookmarked,
}) => {
  const subjectIcon = subjectIconMap[subject] ?? "/icons/cap.svg";

  return (
    <div
      className="companion-card"
      style={color ? { backgroundColor: color } : undefined}
    >
      <div className="flex items-start justify-between">
        <span className="bg-black text-white rounded-full text-sm px-3 py-1.5 capitalize font-medium">
          {capitalize(subject)}
        </span>

        <div className="companion-bookmark">
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={18}
            height={18}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-muted-foreground">
          <span className="font-medium">Topic:</span> {topic}
        </p>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Image src="/icons/clock.svg" alt="duration" width={16} height={16} />
          <span>{duration} mins duration</span>
        </div>
      </div>

      <Button
        asChild
        size="lg"
        className="mt-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white border-none"
      >
        <Link href={`/companions/${id}`}>Launch Lesson</Link>
      </Button>
    </div>
  );
};

export default CompanionCard;
