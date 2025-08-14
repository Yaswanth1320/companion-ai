import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200">
          <Image
            src="/images/logo.svg"
            alt="TeachStream"
            width={46}
            height={44}
            className="drop-shadow-md"
          />
          <span className="text-xl font-bold gradient-text hidden sm:block">
            TeachStream
          </span>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <Link href="/" className="nav-link-underline">
          Home
        </Link>
        <Link href="/dashboard" className="nav-link-underline">
          Dashboard
        </Link>
        <Link href="/companions" className="nav-link-underline">
          Companions
        </Link>
        <Link href="/tier" className="nav-link-underline">
          Tier
        </Link>
        {user ? (
          <Link href="/profile" className="nav-link-underline">
            Profile
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <SignInButton mode="modal">
              <button className="btn-signin">
                <span>Sign in</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </SignInButton>
          </div>
        )}

        {/* Authentication Section */}

        <SignedIn>
          <div className="flex items-center gap-4">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
