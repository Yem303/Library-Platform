
"use client"
import React, { useEffect, useState } from "react";
import BookCardComponent from "./BookCardComponent";
import Link from "next/link";


interface BookType {
  id: string;
  title: string;
  coverUrl: string;
}

export default function BookCardComponentList() {
  const [bookData, setBookData] = useState<BookType[]>([]);

  async function fetchingBookDat() {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=popular&limit=30`
    );

    const data = await response.json();

    const books = data.docs.map((book: any) => ({
      id: book.key.replace("/works/", ""),
      title: book.title,
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "/placeholder-book.jpg",
    }));

    setBookData(books);
  }

  useEffect(() => {
    fetchingBookDat();
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