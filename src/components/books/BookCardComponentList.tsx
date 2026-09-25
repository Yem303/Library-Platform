
"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookCardComponent from "./BookCardComponent";

interface BookType {
  id: string;
  title: string;
  coverUrl: string;
  isFavorite?: boolean;
  isBorrowed?: boolean;
}

interface BookCardComponentListProps {
  source?: "library" | "explore";
  collection?: "all" | "favorites" | "borrowed";
}

const EXPLORE_BOOK_LIMIT = 80;

export default function BookCardComponentList({
  source = "library",
  collection = "all",
}: BookCardComponentListProps) {
  const [bookData, setBookData] = useState<BookType[]>([]);
  const router = useRouter();

  useEffect(() => {
    let isCancelled = false;

    async function fetchBooks() {
      try {
        const endpoint = source === "explore" ? "/api/explore" : "/api/books";
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Unable to load ${source} books`);
        }

        const data = (await response.json()) as BookType[];

        if (!isCancelled) {
          const filteredData =
            collection === "favorites"
              ? data.filter((book) => book.isFavorite)
              : collection === "borrowed"
                ? data.filter((book) => book.isBorrowed)
                : data;

          setBookData(
            source === "explore"
              ? filteredData.slice(0, EXPLORE_BOOK_LIMIT)
              : filteredData
          );
        }
      } catch {
        if (!isCancelled) {
          setBookData([]);
        }
      }
    }

    function handleBooksUpdated() {
      fetchBooks();
    }

    fetchBooks();
    window.addEventListener("books-updated", handleBooksUpdated);

    return () => {
      isCancelled = true;
      window.removeEventListener("books-updated", handleBooksUpdated);
    };
  }, [collection, source]);

  if (bookData.length === 0) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
        {collection === "favorites"
          ? "No favorite books yet."
          : collection === "borrowed"
            ? "No borrowed books yet."
            : "No books in the library yet."}
      </div>
    );
  }

  return (
    <div className="flex gap-9 overflow-x-auto px-9 pb-3">
      {bookData.map((book) => (
        <div
          key={book.id}
          onClick={() => router.push(`/books/${book.id}`)}
          className="cursor-pointer"
        >
          <BookCardComponent
            id={book.id}
            title={book.title}
            coverUrl={book.coverUrl}
          />
        </div>
      ))}
    </div>
  );
}