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

        {/* ===================================================== */}
        {/* Logo */}
        {/* ===================================================== */}

        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <img
            src="/Logo.png"
            alt="iSTAD Books Logo"
            className="
              h-18
              w-18
              object-contain
              -rotate-12
              transition-transform
              duration-300
              group-hover:rotate-0
            "
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

        {/* ===================================================== */}
        {/* Desktop Navigation */}
        {/* ===================================================== */}

        <div className="hidden items-center gap-1 md:flex">

          {/* Feed */}
          <Button
     
            variant={isActive("/") ? "default" : "ghost"}
            size="sm"
            className="rounded-lg p-4"
          >
            <Link
              href="/"
              className="flex items-center gap-2 px-3 text-sm"
            >
              <BookOpen className="h-4 w-4" />
              <span>Feed</span>
            </Link>
          </Button>

          {/* Explore */}
          <Button
          
            variant={isActive("/explore") ? "default" : "ghost"}
            size="sm"
            className="rounded-lg p-4"
          >
            <Link
              href="/explore"
              className="flex items-center gap-2 px-3 text-sm"
            >
              <Compass className="h-4 w-4" />
              <span>Explore</span>
            </Link>
          </Button>

          {/* Add Book */}
          <Button
      
            variant={isActive("/add-book") ? "default" : "ghost"}
            size="sm"
            className="rounded-lg p-4"
          >
            <Link
              href="/add-book"
              className="flex items-center gap-2 px-3 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add Book</span>
            </Link>
          </Button>

          {/* Library */}
          <Button
      
            variant={isActive("/library") ? "default" : "ghost"}
            size="sm"
            className="rounded-lg p-4"
          >
            <Link
              href="/library"
              className="flex items-center gap-2 px-3 text-sm"
            >
              <Library className="h-4 w-4" />
              <span>Library</span>
            </Link>
          </Button>

        </div>

        {/* ===================================================== */}
        {/* Right Side */}
        {/* ===================================================== */}

        <div className="flex items-center gap-2">

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* ================================================= */}
          {/* Clerk - Signed Out */}
          {/* ================================================= */}

          <Show when="signed-out">

            {/* Login */}
            <SignInButton>
              <Button
                variant="outline"
                size="sm"
                className="
                  hidden
                  rounded-lg
                  border-gray-300
                  px-4
                  py-2
                  font-medium
                  transition-all
                  duration-200
                  hover:border-gray-400
                  hover:bg-gray-100
                  sm:flex
                "
              >
                Log in
              </Button>
            </SignInButton>

            {/* Sign Up */}
            <SignUpButton>
              <Button
                size="sm"
                className="
                  rounded-lg
                  bg-black
                  px-4
                  py-2
                  font-medium
                  text-white
                  transition-all
                  duration-200
                  hover:bg-gray-800
                "
              >
                Sign up
              </Button>
            </SignUpButton>

          </Show>

          {/* ================================================= */}
          {/* Clerk - Signed In */}
          {/* ================================================= */}

          <Show when="signed-in">
            <UserButton />
          </Show>

        </div>

      </div>
    </nav>
  );
}
