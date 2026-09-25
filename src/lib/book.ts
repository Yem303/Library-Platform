export async function getBooks(query: string) {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=30`,
    {
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

  const status = [
    "available",
    "borrow_available",
    "preview",
    "unavailable",
  ];

  return data.docs.map((book: any, index: number) => ({
    id: book.key.replace("/works/", ""),
    title: book.title,
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "/placeholder-book.jpg",
    author: book.author_name?.[0] ?? "Unknown Author",
    description: "",
    status: status[index % status.length],
  }));
}
