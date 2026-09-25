"use client";

import Image from "next/image";
import React, { useState } from "react";

interface BookDetailType {
  id: string;
  title: string;
  coverUrl: string;
  author?: string;
  description?: string;
  publishedYear?: string | number;
  genres?: string[];
  isFavorite?: boolean;
  isBorrowed?: boolean;
  href?: string;
}

function BookCardComponentDetail(props: BookDetailType) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(props.isFavorite ?? false);
  const [isBorrowed, setIsBorrowed] = useState(props.isBorrowed ?? false);
  const [saveError, setSaveError] = useState("");

  async function handleSaveBook(action: "favorite" | "borrow") {
    setIsSaving(true);
    setSaveError("");

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          action,
          title: props.title,
          author: props.author || "Unknown Author",
          genre: props.genres?.[0] || "General",
          description: props.description || "No description available.",
          publishedYear:
            typeof props.publishedYear === "number"
              ? props.publishedYear
              : Number.parseInt(String(props.publishedYear || ""), 10) ||
                new Date().getFullYear(),
          coverUrl: props.coverUrl,
        }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error || "Could not add the book.");
      }

      if (action === "favorite") {
        setIsSaved(true);
      } else {
        setIsBorrowed(true);
      }
      window.dispatchEvent(new Event("books-updated"));
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Could not add the book."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-6 shadow-md md:p-10">
      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        {/* Book Cover */}
        <div className="mx-auto w-full max-w-xs">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <Image
              src={props.coverUrl || "/placeholder-book.png"}
              alt={props.title}
              width={280}
              height={420}
              unoptimized
              className="aspect-[2/3] w-full object-cover"
            />
          </div>
        </div>

        {/* Book Information */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {props.title}
          </h1>

          {/* Author */}
          {props.author && (
            <p className="mt-3 text-lg text-gray-500">
              by{" "}
              <span className="font-semibold text-gray-700">
                {props.author}
              </span>
            </p>
          )}

          {/* Published Year */}
          {props.publishedYear && (
            <p className="mt-2 text-sm text-gray-500">
              Published: {props.publishedYear}
            </p>
          )}

          {/* Genres */}
          {props.genres && props.genres.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {props.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-[#1769b0]"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {props.description && (
            <div className="mt-7">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                About this book
              </h2>

              <p className="leading-7 text-gray-600">
                {props.description}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <a
              href={props.href}
              onClick={(event) => {
                if (!props.href) {
                  event.preventDefault();
                  void handleSaveBook("borrow");
                }
              }}
              aria-disabled={isSaving || isBorrowed}
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#1769b0] px-7 text-sm font-semibold text-white transition hover:bg-[#0f5c9d]"
            >
              {isSaving ? "Saving..." : isBorrowed ? "Borrowed" : "Borrow Book"}
            </a>

            <button
              type="button"
              onClick={() => void handleSaveBook("favorite")}
              disabled={isSaving || isSaved}
              className="h-12 rounded-md border border-gray-300 px-7 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              {isSaving ? "Saving..." : isSaved ? "Added to Favorites" : "Add to Favorites"}
            </button>
          </div>
          {saveError && <p className="pt-3 text-sm text-red-600">{saveError}</p>}
        </div>
      </div>
    </div>
  );
}

export default BookCardComponentDetail;