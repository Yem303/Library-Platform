
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Compass,
  Library,
  Menu,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname === path;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#DAD3C8]/70 bg-[#FCFAF7]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center "
        >
          <img
            src="/istad-books-logo.png"
            alt="iSTAD Books Logo"
            className="h-26 w-26 "
          />

          <div className="whitespace-nowrap text-xl font-semibold tracking-tight">
            <span className="text-2xl font-extrabold text-red-600">
              i
            </span>

            <span className="text-2xl font-extrabold text-blue-600">
              STAD
            </span>

            <span className="text-2xl font-medium text-gray-800">
              -books
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">

          {/* Feed */}
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm transition-colors ${
              isActive("/")
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Feed</span>
          </Link>

          {/* Explore */}
          <Link
            href="/explore"
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm transition-colors ${
              isActive("/explore")
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Explore</span>
          </Link>

          {/* Add Book */}
          <Link
            href="/add-book"
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm transition-colors ${
              isActive("/add-book")
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Add Book</span>
          </Link>

          {/* Library */}
          <Link
            href="/library"
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm transition-colors ${
              isActive("/library")
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Library className="h-4 w-4" />
            <span>Library</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Signed Out */}
          <Show when="signed-out">

            {/* Login */}
            <SignInButton>
              <Button
                variant="outline"
                size="sm"
                className="hidden rounded-lg border-gray-300 px-4 py-2 font-medium transition-all duration-200 hover:border-gray-400 hover:bg-gray-100 sm:flex"
              >
                Log in
              </Button>
            </SignInButton>

            {/* Sign Up */}
            <SignUpButton>
              <Button
                size="sm"
                className="rounded-lg bg-black px-4 py-2 font-medium text-white transition-all duration-200 hover:bg-gray-800"
              >
                Sign up
              </Button>
            </SignUpButton>

          </Show>

          {/* Signed In */}
          <Show when="signed-in">
            <UserButton />
          </Show>

        </div>
      </div>
    </nav>
  );
}
