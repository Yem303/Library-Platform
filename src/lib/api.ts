import type { Book, BookAvailabilityStatus } from "@/types/book";

const BASE_URL = "https://openlibrary.org";

// Open Library asks apps to identify themselves. Put your real email here.
const HEADERS = { "User-Agent": "istad-books/1.0 (your-email@example.com)" };

// Map Open Library's ebook_access value to your 4 card states
function mapStatus(access?: string): BookAvailabilityStatus {
  switch (access) {
    case "public":
      return "available";
    case "borrowable":
      return "borrow_available";
    case "printdisabled":
      return "preview";
    default:
      return "unavailable";
  }
}

export async function searchBooks(
  query: string,
  page = 1,
  limit = 24,
): Promise<Book[]> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: String(limit),
    // only ask for the fields you use, which is much faster
    fields: "key,title,cover_i,author_name,first_publish_year,ebook_access",
  });

  const res = await fetch(`${BASE_URL}/search.json?${params}`, {
    headers: HEADERS,
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Open Library search failed: ${res.status}`);
  }

  const data = await res.json();

  return data.docs.map((doc: any) => ({
    id: doc.key.replace("/works/", ""),
    title: doc.title,
    author: doc.author_name?.[0] ?? "Unknown Author",
    year: doc.first_publish_year,
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : "/placeholder-book.jpg",
    status: mapStatus(doc.ebook_access),
  }));
}
