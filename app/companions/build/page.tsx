"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { createCompanion } from "@/lib/actions/companions.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CompanionFormData {
  name: string;
  subject: string;
  topic: string;
  voice: string;
  style: string;
  duration: number;
}

type CreatedCompanion = { id: string | number };

const BuildCompanion = () => {
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<CompanionFormData>({
    defaultValues: {
      name: "",
      subject: "maths",
      topic: "",
      voice: "male",
      style: "casual",
      duration: 15,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setImageFile(file);
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setSelectedImage(e.target?.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  async function onSubmit(values: CompanionFormData) {
    if (isSubmitting) return;
    try {
      // Validate first
      if (!values.name || values.name.trim() === "") {
        toast.error("Please enter a companion name");
        return;
      }

      if (!values.topic || values.topic.trim() === "") {
        toast.error("Please enter what the companion should teach");
        return;
      }

      setIsSubmitting(true);

      const createPromise = createCompanion(values);
      toast.promise(createPromise, {
        loading: "Creating companion...",
        success: "Companion created successfully!",
        error: "Failed to create companion. Please try again.",
      });

      const companion = (await createPromise) as CreatedCompanion;
      router.push(`/companions/${companion.id}`);
      form.reset();
    } catch (error) {
      console.error("Error creating companion:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SignedIn>
        <main className="bg-gradient-to-br from-background via-background to-muted/20 py-12 px-6 sm:px-8 lg:px-12 xl:px-20">
          <div className="max-w-8xl mx-auto">
            {/* Header */}
            {/* <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                Companion Builder
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create your personalized AI learning companion with custom name,
                subject, voice, and personality
              </p>
            </div> */}

            {/* Form Card */}
            <div className="bg-card rounded-3xl border border-border/50 shadow-2xl p-8 sm:p-10 lg:p-18">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10 space-x-60"
                >
                  {/* Companion Icon Section - Temporarily Disabled */}
                  {/* <div>
                    <FormLabel className="text-base font-semibold text-foreground">
                      Companion icon <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="flex gap-4 items-center mt-2">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden">
                        <Image
                          src="/icons/cap.svg"
                          alt="Default icon"
                          width={32}
                          height={32}
                          className="opacity-60"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          required
                        />
                        <label htmlFor="image-upload">
                          <Button
                            type="button"
                            variant="outline"
                            className="h-20 px-6 border-2 transition-all duration-200 cursor-pointer border-dashed border-border/50 hover:border-primary/50"
                            asChild
                          >
                            <div className="flex flex-col items-center gap-2">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              <span className="text-sm font-medium">
                                Upload image
                              </span>
                            </div>
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div> */}

                  {/* Form Fields - Each on its own row */}
                  <div className="space-y-8 w-full">
                    {/* Companion Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Companion name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-foreground">
                            Companion name{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="companion name"
                              className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Subject */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-foreground">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Select
                              options={[
                                { value: "maths", label: "Maths" },
                                { value: "science", label: "Science" },
                                { value: "history", label: "History" },
                                { value: "coding", label: "Coding" },
                                { value: "economics", label: "Economics" },
                              ]}
                              className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Voice */}
                    <FormField
                      control={form.control}
                      name="voice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-foreground">
                            Voice
                          </FormLabel>
                          <FormControl>
                            <Select
                              options={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                              ]}
                              className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Style */}
                    <FormField
                      control={form.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-foreground">
                            Style
                          </FormLabel>
                          <FormControl>
                            <Select
                              options={[
                                { value: "casual", label: "Casual" },
                                { value: "formal", label: "Formal" },
                              ]}
                              className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Duration */}
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-foreground">
                            Duration (minutes)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="15"
                              className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                              disabled={isSubmitting}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Topic - Full Width */}
                    <FormField
                      control={form.control}
                      name="topic"
                      rules={{ required: "Topic is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold text-foreground">
                            What should this companion teach?{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="topic"
                              className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 space-y-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="w-full h-14 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] hover:from-[#E55A2B] hover:to-[#D4491A] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-none disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                          Building...
                        </span>
                      ) : (
                        "Build Companion"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
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

export default BuildCompanion;
