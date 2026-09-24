import type { Book, BookAvailabilityStatus } from "@/types/book";

export const BOOK_FETCH_LIMIT = 40;

export const BOOK_CATEGORIES = [
  "popular",
  "classic",
  "programming",
  "romance",
  "fiction",
  "fantasy",
  "mystery",
  "drama",
  "adventure",
  "poetry",
  "dystopian",
  "gothic",
  "biography",
  "history",
  "science",
  "children",
  "philosophy",
  "self-help",
];

export const BOOK_CATEGORY_LABELS: Record<string, string> = {
  popular: "Trending Books",
  classic: "Classic Books",
  programming: "Programming Books",
  romance: "Romance Books",
  fiction: "Fiction Books",
  fantasy: "Fantasy Books",
  mystery: "Mystery Books",
  drama: "Drama Books",
  adventure: "Adventure Books",
  poetry: "Poetry Books",
  dystopian: "Dystopian Books",
  gothic: "Gothic Books",
  biography: "Biography Books",
  history: "History Books",
  science: "Science Books",
  children: "Children's Books",
  philosophy: "Philosophy Books",
  "self-help": "Self-Help Books",
};

async function safeFetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

type OpenLibraryBook = {
  key?: string;
  title?: string;
  cover_i?: number;
  author_name?: string[];
};

export async function getBooks(query: string): Promise<Book[]> {
  const data = (await safeFetchJson<{ docs?: OpenLibraryBook[] }>(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${BOOK_FETCH_LIMIT}`
  )) ?? { docs: [] };
  const docs: OpenLibraryBook[] = Array.isArray(data.docs) ? data.docs : [];

  const status: BookAvailabilityStatus[] = [
    "available",
    "borrow_available",
    "preview",
    "unavailable",
  ];

  return docs
    .filter(
      (book): book is OpenLibraryBook =>
        Boolean(book) &&
        typeof book === "object" &&
        typeof book.key === "string" &&
        typeof book.title === "string"
    )
    .slice(0, BOOK_FETCH_LIMIT)
    .map((book: OpenLibraryBook, index: number) => ({
      id: book.key!.replace("/works/", ""),
      title: book.title!,
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "/placeholder-book.jpg",
      author: book.author_name?.[0] ?? "Unknown Author",
      description: "",
      status: status[index % status.length],
    }));
}