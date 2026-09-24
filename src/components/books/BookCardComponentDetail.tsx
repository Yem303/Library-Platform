import React from "react";
import BorrowButton from "@/components/books/BorrowButton";

interface BookDetailType {
  id: string;
  title: string;
  coverUrl: string;
  author?: string;
  description?: string;
  publishedYear?: string | number;
  genres?: string[];
  href?: string;
}

function BookCardComponentDetail(props: BookDetailType) {
  return (
    <div className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-6 shadow-md md:p-10">
      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        {/* Book Cover */}
        <div className="mx-auto w-full max-w-[280px]">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={props.coverUrl || "/placeholder-book.png"}
              alt={props.title}
              className="
                aspect-[2/3]
                w-full
                object-cover
              "
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
                  className="
                    rounded-full
                    bg-blue-50
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-[#1769b0]
                  "
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
            <BorrowButton
              id={props.id}
              title={props.title}
              coverUrl={props.coverUrl}
              author={props.author}
            />

            <button
              type="button"
              className="
                h-12
                rounded-md
                border
                border-gray-300
                px-7
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-50
              "
            >
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCardComponentDetail;