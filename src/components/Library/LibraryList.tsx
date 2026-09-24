"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BORROWED_CHANGED_EVENT,
  getBorrowedBooks,
  returnBook,
  type BorrowedBook,
} from "@/lib/borrowed";

export default function LibraryList() {
  const [books, setBooks] = useState<BorrowedBook[]>([]);
  // localStorage is only readable in the browser, so render the empty shell
  // on the server and fill it in after mount.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function sync() {
      setBooks(getBorrowedBooks());
      setReady(true);
    }

    sync();

    window.addEventListener(BORROWED_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(BORROWED_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!ready) {
    return null;
  }

  if (books.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">
          No borrowed books yet
        </h2>

        <p className="mt-2 text-gray-500">
          Books you borrow will show up here.
        </p>

        <Link
          href="/books"
          className="
            mt-6
            inline-flex
            h-11
            items-center
            justify-center
            rounded-md
            bg-[#1769b0]
            px-6
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#0f5c9d]
          "
        >
          Browse books
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">My Library</h1>

      <p className="mt-2 text-gray-500">
        {books.length} borrowed {books.length === 1 ? "book" : "books"}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {books.map((book) => (
          <div key={book.id} className="group flex flex-col">
            <Link
              href={`/books/${book.id}`}
              className="overflow-hidden rounded-md bg-gray-100 shadow-sm"
            >
              <img
                src={book.coverUrl || "/placeholder-book.jpg"}
                alt={book.title}
                className="
                  aspect-[2/3]
                  w-full
                  object-cover
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />
            </Link>

            <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-gray-900">
              {book.title}
            </h3>

            {book.author && (
              <p className="mt-1 text-xs text-gray-500">{book.author}</p>
            )}

            <p className="mt-1 text-xs text-gray-400">
              Borrowed {new Date(book.borrowedAt).toLocaleDateString()}
            </p>

            <button
              type="button"
              onClick={() => returnBook(book.id)}
              className="
                mt-3
                h-10
                rounded-md
                border
                border-gray-300
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-50
              "
            >
              Return
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
