"use client";

import React, { useEffect, useState } from "react";
import BookCardComponent from "./BookCardComponent";
import Link from "next/link";

interface BookType {
  id: string;
  title: string;
  coverUrl: string;
}

interface OpenLibraryBook {
  key?: string;
  title?: string;
  cover_i?: number;
}

interface LocalBook extends BookType {
  author: string;
}

export default function BookCardComponentList() {
  const [bookData, setBookData] = useState<BookType[]>([]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchBooks() {
      const [openLibraryResponse, localResponse] = await Promise.all([
        fetch("https://openlibrary.org/search.json?q=popular&limit=30"),
        fetch("/api/books"),
      ]);

      const openLibraryData = await openLibraryResponse.json();
      const localBooks: LocalBook[] = localResponse.ok
        ? await localResponse.json()
        : [];
      const popularBooks: BookType[] = openLibraryData.docs
        .filter((book: OpenLibraryBook) => book.key && book.title)
        .map((book: OpenLibraryBook) => ({
          id: book.key!.replace("/works/", ""),
          title: book.title!,
          coverUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "/placeholder-book.jpg",
        }));

      if (!isCancelled) {
        setBookData([...localBooks, ...popularBooks]);
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
  }, []);

return (
  <div className="flex gap-9 overflow-x-auto px-9 pb-3">
    {bookData.map((book) => (
      <Link
        key={book.id}
        href={`/books/${book.id}`}
      >
        <BookCardComponent
          id={book.id}
          title={book.title}
          coverUrl={book.coverUrl}
        />
      </Link>
    ))}
  </div>
);
}