"use client";
import { getSubjectColor } from "@/constants";
import { cn, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companions.actions";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

const CampanionBlock = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [speaking, setSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieref = React.useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieref) {
      if (speaking) {
        lottieref.current?.play();
      } else {
        lottieref.current?.stop();
      }
    }
  }, [speaking, lottieref]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onStartSpeech = () => setSpeaking(true);
    const onEndSpeech = () => {
      setSpeaking(false);
      addToSessionHistory(companionId);
    };

    const onError = (error: Error) => {
      console.error("Error in CampanionBlock:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onStartSpeech);
    vapi.on("speech-end", onEndSpeech);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onStartSpeech);
      vapi.off("speech-end", onEndSpeech);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleConnect = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-1001"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "animate-pulse opacity-100"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={name}
                width={120}
                height={120}
                className="max-sm:w-fit"
              />
            </div>

            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieref}
                animationData={soundwaves}
                autoPlay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-full"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={`/icons/${isMuted ? "mic-off" : "mic-on"}.svg`}
              alt="Toggle Microphone"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">{isMuted ? "Unmute" : "Mute"}</p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE
                ? handleDisconnect
                : handleConnect
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Call"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : "Start Call"}
          </button>
        </div>
      </section>
      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => {
            if (message.role === "assistant") {
              return (
                <p key={index} className="max-sm:text-sm">
                  {name.split(" ")[0].replace("/[.,]/g, ", "")}:{" "}
                  {message.content}
                </p>
              );
            } else {
              return (
                <p key={index} className="text-primary max-sm:text-sm">
                  {userName}: {message.content}
                </p>
              );
            }
          })}
        </div>

        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CampanionBlock;
