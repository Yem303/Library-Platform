
import React, { useEffect, useState } from "react";

import BookCardComponentDetail, { BookDetailType } from "./BookCardComponentDetail";



type BookIdType = {
  id: string;
};

export default function BookCardComponentListDetail({
  id,
}: BookIdType) {
  const [bookData, setBookData] =
    useState<BookDetailType | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchBookData() {
      const response = await fetch(
        `https://openlibrary.org/works/${id}.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch book");
      }

      const data = await response.json();

      const book: BookDetailType = {
        id,
        title: data.title ?? "Unknown Title",

        coverUrl: data.covers?.[0]
          ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
          : "/placeholder-book.jpg",

        description:
          typeof data.description === "string"
            ? data.description
            : data.description?.value ?? "",

        publishedYear: data.first_publish_date ?? "",

        author:
          data.authors?.[0]?.author?.key?.split("/").pop() ??
          "Unknown Author",

        genres: data.subjects?.slice(0, 5) ?? [],

        publisher: data.publishers?.[0]?.name ?? "",

        language:
          data.languages?.[0]?.key?.split("/").pop() ?? "",

        isFavorite: false,
        isBorrowed: false,
      };

      if (!ignore) {
        setBookData(book);
      }
    }

    fetchBookData().catch((error) => {
      console.error("Failed to fetch book:", error);

      if (!ignore) {
        setBookData(null);
      }
    });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (!bookData) {
    return <p>Loading...</p>;
  }

  return (
    <BookCardComponentDetail
      id={bookData.id}
      title={bookData.title}
      coverUrl={bookData.coverUrl}
      description={bookData.description}
      publishedYear={bookData.publishedYear}
      genres={bookData.genres}
      isFavorite={bookData.isFavorite}
      isBorrowed={bookData.isBorrowed}
      author={bookData.author}
      publisher={bookData.publisher}
      language={bookData.language}
    />
  );
}
