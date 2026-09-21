"use client";

import React, { useEffect, useState } from "react";

import BookCardComponentDetail from "./BookCardComponentDetail";

type BookIdType = {
  id: string;
};

type BookDetailType = {
  id: string;
  title: string;
  coverUrl: string;
  description?: string;
  publishedYear?: string;
  genres?: string[];
};

export default function BookCardComponentListDetail({
  id,
}: BookIdType) {
  const [bookData, setBookData] = useState<BookDetailType | null>(null);

  async function fetchingBookData() {
    const response = await fetch(
      `https://openlibrary.org/works/${id}.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }

    const data = await response.json();

    const book = {
      id: id,
      title: data.title,
      coverUrl: data.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
        : "/placeholder-book.jpg",
      description:
        typeof data.description === "string"
          ? data.description
          : data.description?.value || "",
      publishedYear: data.first_publish_date,
      genres: data.subjects?.slice(0, 5) || [],
    };

    setBookData(book);
  }

  useEffect(() => {
    fetchingBookData();
  }, [id]);

  if (!bookData) {
    return <p>Loading...</p>;
  }

  return (
    <BookCardComponentDetail
      title={bookData.title}
      coverUrl={bookData.coverUrl}
      description={bookData.description}
      publishedYear={bookData.publishedYear}
      genres={bookData.genres}
    />
  );
}