"use client";
<<<<<<< HEAD

import React, { useRef, useState } from "react";
import BorrowButton from "@/components/books/BorrowButton";

export interface BookDetailType {
=======

import Image from "next/image";
import React, { useState } from "react";

interface BookDetailType {
>>>>>>> origin/piseth
  id: string;
  title: string;
  coverUrl: string;
  author: string;
  editionOf?: { title: string; year?: number | string };
  rating?: number;
  ratingCount?: number;
  wantToRead?: number;
  haveRead?: number;
  description?: string;
<<<<<<< HEAD
  publishDate?: string;
  publisher?: string;
  language?: string;
  previewLanguages?: string[];
  subjects?: string[];
  people?: string[];
  editionCount?: number;
  lastEditedBy?: string;
  lastEditedDate?: string;
  readHref?: string;
}

const BLUE = "bg-[#1769b0] hover:bg-[#125a9a]";
const LINK =
  "text-[#1a4f8b] underline underline-offset-2 hover:text-[#0f3a6b]";
const MAX_TILT = 8;

/* ---------- tiny inline icons ---------- */

const Icon = ({
  d,
  className = "h-5 w-5",
}: {
  d: string;
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d={d} />
  </svg>
);

const ICONS = {
  chevron: "M6 9l6 6 6-6",
  external:
    "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  review: "M4 5h16v11H9l-5 4V5zM8 9h8M8 12h5",
  notes: "M6 3h8l4 4v14H6V3zM14 3v4h4",
  share:
    "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
};

const Star = ({
  fill,
  className,
}: {
  fill: string;
  className: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill={fill}
    aria-hidden
  >
    <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5L9 8.9z" />
  </svg>
);

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-[#e3d9bd] bg-white px-3 py-1 text-[13px] text-gray-700">
      {children}
    </span>
  );
}
=======
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
>>>>>>> origin/piseth

function ChipRow({
  label,
  items,
}: {
  label: string;
  items?: string[];
}) {
  if (!items?.length) return null;

  return (
    <div className="flex items-start gap-3">
      <span className="mt-1.5 flex w-24 shrink-0 items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-gray-600">
        <span className="text-[8px]">▸</span>
        {label}
      </span>

<<<<<<< HEAD
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <Chip key={i}>{i}</Chip>
        ))}
=======
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
>>>>>>> origin/piseth
      </div>
    </div>
  );
}

/* ---------- main component ---------- */

export default function BookCardComponentDetail(
  props: BookDetailType
) {
  const coverRef = useRef<HTMLImageElement>(null);
  const [expanded, setExpanded] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const el = coverRef.current;

    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    el.style.setProperty("--ry", `${x * MAX_TILT * 2}deg`);
    el.style.setProperty("--rx", `${-y * MAX_TILT * 2}deg`);
  };

  const onLeave = () => {
    coverRef.current?.style.setProperty("--rx", "0deg");
    coverRef.current?.style.setProperty("--ry", "0deg");
  };

  const rating = props.rating ?? 0;

  return (
    <div className="mx-auto w-full max-w-6xl rounded-lg border border-[#e3d9bd] bg-white p-3 shadow-sm md:p-4">
      <div className="grid gap-6 md:grid-cols-[250px_1fr]">

        {/* ================= LEFT: cover + actions ================= */}

        <aside className="h-fit rounded-md border border-gray-200 p-3">
          <div className="px-3 pt-2">
            <img
              ref={coverRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              src={props.coverUrl || "/placeholder-book.png"}
              alt={props.title}
              className="aspect-[2/3] w-full rounded-md object-cover shadow-md will-change-transform transition-transform duration-200 ease-out [transform:perspective(700px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] motion-reduce:!transform-none"
            />
          </div>

          {/* Read (split button) */}

          <div className="mt-4 flex gap-0.5 overflow-hidden rounded-md">
            <a
              href={props.readHref ?? "#"}
              className={`flex flex-1 items-center justify-center gap-6 px-3 py-3 text-[15px] text-white ${BLUE}`}
            >
              Read

              <Icon
                d={ICONS.external}
                className="h-4 w-4"
              />
            </a>

            <button
              className={`w-10 text-white ${BLUE}`}
              aria-label="More reading options"
            >
              <Icon
                d={ICONS.chevron}
                className="mx-auto h-4 w-4"
              />
            </button>
          </div>

          {/* Buy */}

          <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
            Buy
            <Icon
              d={ICONS.chevron}
              className="h-3.5 w-3.5"
            />
          </button>

          {/* Add to List (split) */}

          <div className="mt-3 flex overflow-hidden rounded-md border border-gray-300 bg-[#f4f1e8] text-gray-800">
            <button className="flex-1 py-2.5 text-[15px] hover:bg-[#ece8da]">
              Add to Library
            </button>

            <button
              className="w-10 border-l border-gray-300 hover:bg-[#ece8da]"
              aria-label="List options"
            >
              <Icon
                d={ICONS.chevron}
                className="mx-auto h-4 w-4"
              />
            </button>
          </div>

          {/* Rate this book */}

          <div
            className="mt-4 flex justify-center gap-2"
            aria-label="Rate this book"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className="text-gray-300 hover:text-amber-500"
                aria-label={`${n} stars`}
              >
                <Star
                  fill="currentColor"
                  className="h-7 w-7"
                />
              </button>
            ))}
          </div>

          {/* Review / Notes / Share */}

          <div className="mt-4 flex justify-around border-t border-[#e3d9bd] pt-4 text-xs text-gray-700">
            {[
              ["Review", ICONS.review],
              ["Notes", ICONS.notes],
              ["Share", ICONS.share],
            ].map(([label, d]) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1 hover:text-[#1769b0]"
              >
                <Icon
                  d={d}
                  className="h-6 w-6"
                />
                {label}
              </button>
            ))}
          </div>

          <h3 className="mt-5 text-sm font-bold text-gray-900">
            Download Options
          </h3>
        </aside>

        {/* ================= RIGHT: details ================= */}

        <div className="min-w-0">

          {/* Tabs */}

          <nav className="flex flex-wrap items-center gap-1 border-y border-gray-200 py-2 text-[13px] font-bold text-gray-800">
            <a
              className="rounded-full bg-[#1769b0] px-4 py-2 text-white"
              href="#"
            >
              Overview
            </a>

            <a
              className="rounded-full px-4 py-2 hover:bg-gray-100"
              href="#"
            >
              View {props.editionCount ?? 0} Editions
            </a>

            {[
              "Details",
              "Reviews",
              "Lists",
              "Related Books",
            ].map((t) => (
              <a
                key={t}
                className="rounded-full px-4 py-2 hover:bg-gray-100"
                href="#"
              >
                {t}
              </a>
            ))}
          </nav>

          {/* Title block */}

          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              {props.editionOf && (
                <p className="font-serif italic text-gray-500">
                  An edition of{" "}
                  <a
                    href="#"
                    className="underline"
                  >
                    {props.editionOf.title}
                  </a>{" "}
                  {props.editionOf.year && (
                    <span className="text-sm not-italic">
                      ({props.editionOf.year})
                    </span>
                  )}
                </p>
              )}

              <h1 className="font-serif text-4xl text-gray-900">
                {props.title}
              </h1>

              <p className="mt-3 font-serif text-lg text-gray-600">
                by{" "}
                <a
                  href="#"
                  className={LINK}
                >
                  {props.author}
                </a>
              </p>
            </div>

            <div className="flex items-start gap-3 text-right text-xs text-gray-600">
              {props.lastEditedBy && (
                <p className="leading-relaxed">
                  Last edited by{" "}
                  <a
                    href="#"
                    className={LINK}
                  >
                    {props.lastEditedBy}
                  </a>
                  <br />
                  {props.lastEditedDate} |{" "}
                  <a
                    href="#"
                    className={LINK}
                  >
                    History
                  </a>
                </p>
              )}

              <button className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-800 shadow-sm hover:bg-gray-50">
                Edit
              </button>
            </div>
          </div>

          {/* Ratings row */}

          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-gray-700">
            <span
              className="flex"
              aria-label={`${props.rating} out of 5`}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className="h-5 w-5"
                  fill={
                    n <= Math.round(rating)
                      ? "#e0a422"
                      : "#d8d8d8"
                  }
                />
              ))}
            </span>

            <span>
              {rating.toFixed(1)} (
              {props.ratingCount ?? 0} ratings)
            </span>

            <span>·</span>

            <span>
              {props.wantToRead ?? 0} Want to read
            </span>

            <span>·</span>

            <span>
              {props.haveRead ?? 0} Have read
            </span>
          </div>

          {/* Description with fade + Read More */}

          {props.description && (
            <div className="mt-8">
              <div
                className={`relative overflow-hidden leading-7 text-gray-700 ${
                  expanded ? "" : "max-h-[6.5rem]"
                }`}
              >
                <p>{props.description}</p>

                {!expanded && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>

              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-3 flex items-center gap-1 text-[15px] font-medium text-[#1769b0] hover:underline"
              >
                {expanded ? "Read Less" : "Read More"}

                <Icon
                  d={ICONS.chevron}
                  className={`h-4 w-4 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}

          {/* Stat boxes */}

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {[
              ["Publish Date", props.publishDate, false],
              ["Publisher", props.publisher, true],
              ["Language", props.language, true],
            ].map(([label, value, isLink]) => (
              <div
                key={label as string}
                className="rounded-md border border-gray-200 px-4 py-4 text-center"
              >
                <p className="text-sm text-gray-500">
                  {label}
                </p>

                <p
                  className={`mt-1 ${
                    isLink
                      ? "text-[#1a4f8b]"
                      : "text-gray-900"
                  }`}
                >
                  {value ?? "—"}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <BorrowButton
              id={props.id}
              title={props.title}
              coverUrl={props.coverUrl}
              author={props.author}
            />
          </div>

          {/* Previews */}

          {props.previewLanguages?.length ? (
            <p className="mt-6 text-[15px] text-gray-500">
              Previews available in:{" "}
              {props.previewLanguages.map((l, i) => (
                <React.Fragment key={l}>
                  <a
                    href="#"
                    className={LINK}
                  >
                    {l}
                  </a>

                  {i <
                    props.previewLanguages!.length - 1 &&
                    " "}
                </React.Fragment>
              ))}
            </p>
          ) : null}

          {/* Subjects / People */}

          <div className="mt-4 space-y-4">
            <ChipRow
              label="Subjects"
              items={props.subjects}
            />

            <ChipRow
              label="People"
              items={props.people}
            />
          </div>
        </div>
      </div>
    </div>
  );
}