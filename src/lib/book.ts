
import { Book } from "@/types/book";

type OpenLibraryBook = {
  key?: string;
  title?: string;
  cover_i?: number;
  author_name?: string[];
};

type OpenLibraryResponse = {
  docs?: OpenLibraryBook[];
};

const BOOK_FETCH_LIMIT = 30;

export async function getBooks(query: string): Promise<Book[]> {
  const data =
    (await safeFetchJson<OpenLibraryResponse>(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(
        query
      )}&limit=${BOOK_FETCH_LIMIT}`
    )) ?? { docs: [] };

  const docs: OpenLibraryBook[] = Array.isArray(data.docs)
    ? data.docs
    : [];

  const status = [
    "available",
    "borrow_available",
    "preview",
    "unavailable",
  ] as const;

  return docs.map((book, index) => ({
    id: book.key?.replace("/works/", "") ?? "",
    title: book.title ?? "Unknown Title",

    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "/placeholder-book.jpg",

    author: book.author_name?.[0] ?? "Unknown Author",

    description: "",

    status: status[index % status.length],
  }));
}

async function safeFetchJson<T>(
  url: string
): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(
        `OpenLibrary API error: ${response.status} ${response.statusText}`
      );

      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("OpenLibrary fetch failed:", error);

    return null;
  }
}
