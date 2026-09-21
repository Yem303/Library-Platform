"use client";

import { useRef } from "react";

import BookCard from "./BookCard";

import type { Book } from "@/types/book";
import Link from "next/link";

interface BookCarouselProps {
  books: Book[];
}

export default function BookCarousel({
  books,
}: BookCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  /* ================================
     PREVIOUS
  ================================= */

  const scrollLeft = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  /* ================================
     NEXT
  ================================= */

  const scrollRight = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  /* ================================
     MOUSE WHEEL
  ================================= */

  const handleWheel = (
    e: React.WheelEvent<HTMLDivElement>
  ) => {
    if (!sliderRef.current) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      sliderRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="relative px-8 py-5 md:px-16">

      {/* LEFT BUTTON */}

      <button
        type="button"
        onClick={scrollLeft}
        aria-label="Previous books"
        className="
          absolute
          left-2
          top-1/2
          z-10
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#3b9aca]
          text-white
          shadow-md
          transition
          hover:bg-[#2785b5]
          active:scale-95
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* ================================
          SCROLL AREA
      ================================= */}

      <div
        ref={sliderRef}
        onWheel={handleWheel}
        className="
          flex
          gap-8
          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          px-1
          py-2

          [scrollbar-width:thin]

          [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
        "
      >
       {books.map((book) => (
        <Link
          key={book.id}
          href={`/books/${book.id}`}
          className="
            min-w-[calc(50%-16px)]
            snap-start
            sm:min-w-[calc(33.333%-22px)]
            lg:min-w-[calc(25%-24px)]
            xl:min-w-[calc(16.666%-27px)]
          "
        >
          <BookCard
            title={book.title}
            coverUrl={book.coverUrl}
            status={book.status}
            href={book.href}
          />
        </Link>
      ))}
      </div>

      {/* RIGHT BUTTON */}

      <button
        type="button"
        onClick={scrollRight}
        aria-label="Next books"
        className="
          absolute
          right-2
          top-1/2
          z-10
          flex
          h-10
          w-10
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-[#3b9aca]
          text-white
          shadow-md
          transition
          hover:bg-[#2785b5]
          active:scale-95
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

    </div>
  );
}