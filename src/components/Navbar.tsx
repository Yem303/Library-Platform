
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  BookOpen,
  Compass,
  Library,
  Menu,
  Plus,
  X,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function isActive(path: string) {
    return pathname === path;
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#DAD3C8]/70 bg-[#FCFAF7]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={closeMenu}
        >
          <img
            src="/istad-books-logo.png"
            alt="iSTAD Books Logo"
            className="h-26 w-26 object-contain"
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
                ? "bg-orange-700 text-white"
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
                ? "bg-orange-700 text-white"
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
                ? "bg-orange-700 text-white"
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
                ? "bg-orange-700 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Library className="h-4 w-4" />
            <span>Library</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Signed Out */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="outline"
                size="sm"
                className="hidden rounded-lg border-gray-300 px-4 font-medium transition-all duration-200 hover:border-gray-400 hover:bg-gray-100 sm:flex"
              >
                Log in
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button
                size="sm"
                className="rounded-lg bg-orange-700 px-4 font-medium text-white transition-all duration-200 hover:bg-gray-800"
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

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="border-t border-[#DAD3C8]/70 bg-[#FCFAF7] shadow-md md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

            {/* Feed */}
            <Link
              href="/"
              onClick={closeMenu}
              className={`mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                isActive("/")
                  ? "bg-orange-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Feed</span>
            </Link>

            {/* Explore */}
            <Link
              href="/explore"
              onClick={closeMenu}
              className={`mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                isActive("/explore")
                  ? "bg-orange-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Compass className="h-5 w-5" />
              <span>Explore</span>
            </Link>

            {/* Add Book */}
            <Link
              href="/add-book"
              onClick={closeMenu}
              className={`mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                isActive("/add-book")
                  ? "bg-orange-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>Add Book</span>
            </Link>

            {/* Library */}
            <Link
              href="/library"
              onClick={closeMenu}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                isActive("/library")
                  ? "bg-orange-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Library className="h-5 w-5" />
              <span>Library</span>
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}
