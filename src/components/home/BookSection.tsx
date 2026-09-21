"use client"

import BookCarousel from "./BookCarousel";

import type { Book } from "@/types/book";

interface BookSectionProps {
  title: string;
  books: Book[];
}

export default function BookSection({
  title,
  books,
}: BookSectionProps) {
  return (
    <section className="w-full bg-[#f5f3ea]">

      {/* Section Header */}

      <div className="border-b border-gray-200 bg-white px-8 py-3">
        <a
          href="#"
          className="
            text-lg
            text-[#005a9c]
            underline
            underline-offset-2
          "
        >
          {title}
        </a>
      </div>

      {/* Books Carousel */}

      <BookCarousel books={books} />

    </section>
  );
}