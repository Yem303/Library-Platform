// src/app/books/[id]/page.tsx
import React from "react";
import BookCardComponentDetail from "@/components/books/BookCardComponentDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  // In Next 15+ the params object can be asynchronous -> await it
  const { id } = await params;

  const url = `https://openlibrary.org/works/${id}.json`;

  try {
    const response = await fetch(url, {
      // optional: revalidate the data every 60 seconds
      next: { revalidate: 60 },
      // optionally set headers if the API requires them
      // headers: { 'User-Agent': 'my-app/1.0' },
    });

    // surface non-2xx errors with a clear message
    if (!response.ok) {
      throw new Error(`OpenLibrary fetch failed: ${response.status} ${response.statusText}`);
    }

    const book = await response.json();

    // normalize description safely
    const description =
      typeof book?.description === "string"
        ? book.description
        : book?.description?.value ?? "";

    // pick first cover or a placeholder
    const coverUrl = Array.isArray(book?.covers) && book.covers.length > 0
      ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
      : "/placeholder-book.jpg";

    // optional: pick a sensible publisher/publish date value
    const publisher = book?.first_publish_date ?? book?.created?.value ?? "";

    return (
      <div>
        <BookCardComponentDetail
          title={book?.title ?? "Untitled"}
          coverUrl={coverUrl}
          description={description}
          publisher={publisher}
          author={""}
        />
      </div>
    );
  } catch (err: any) {
    // server-side logging for debugging (do not leak internals to users)
    console.error("Error fetching book from OpenLibrary:", err);

    // friendly fallback UI
    return (
      <div>
        <h1>Unable to load book</h1>
        <p>There was an error loading the requested book. Please try again later.</p>
      </div>
    );
  }
}