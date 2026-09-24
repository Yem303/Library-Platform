import { NextResponse } from "next/server";

const EXPLORER_CATEGORIES = [
  "popular",
  "fiction",
  "classic",
  "romance",
  "mystery",
  "fantasy",
  "drama",
  "adventure",
  "poetry",
  "gothic",
  "dystopian",
  "programming",
];

interface OpenLibraryBook {
  key?: string;
  title?: string;
  cover_i?: number;
  author_name?: string[];
}

export async function GET() {
  try {
    const results = await Promise.all(
      EXPLORER_CATEGORIES.map(async (category) => {
        try {
          const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(category)}&limit=10`,
            { next: { revalidate: 3600 } }
          );

          if (!response.ok) {
            return [];
          }

          const data = (await response.json()) as { docs?: OpenLibraryBook[] };
          const docs = Array.isArray(data.docs) ? data.docs : [];

          return docs
            .filter(
              (book): book is OpenLibraryBook =>
                Boolean(book) &&
                typeof book === "object" &&
                typeof book.key === "string" &&
                typeof book.title === "string"
            )
            .map((book) => ({
              id: book.key!.replace("/works/", ""),
              title: book.title!,
              coverUrl: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "/placeholder-book.jpg",
            }));
        } catch {
          return [];
        }
      })
    );

    const flattened = results.flat();
    const unique = flattened.filter(
      (book, index, list) =>
        list.findIndex((item) => item.id === book.id) === index
    );

    return NextResponse.json(unique.slice(0, 80));
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to load books right now." },
      { status: 500 }
    );
  }
}
