export async function getBooks(query: string) {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(
      query
    )}&limit=30&fields=key,title,cover_i,author_name,first_publish_year,ebook_access`,
    {
      headers: { "User-Agent": "istad-books/1.0 (your-email@example.com)" },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  const data = await response.json();

  function mapStatus(access?: string) {
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

  return data.docs.map((book: any) => ({
    id: book.key.replace("/works/", ""),
    title: book.title,
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "/placeholder-book.jpg",
    author: book.author_name?.[0] ?? "Unknown Author",
    year: book.first_publish_year,
    description: "",
    status: mapStatus(book.ebook_access),
  }));
}

export async function getBooksBySubject(subject: string, limit = 24) {
  const response = await fetch(
    `https://openlibrary.org/subjects/${encodeURIComponent(
      subject
    )}.json?limit=${limit}`,
    {
      headers: { "User-Agent": "istad-books/1.0 (your-email@example.com)" },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch subject: ${response.status}`);
  }

  const data = await response.json();

  return data.works.map((work: any) => ({
    id: work.key.replace("/works/", ""),
    title: work.title,
    coverUrl: work.cover_id
      ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
      : "/placeholder-book.jpg",
    author: work.authors?.[0]?.name ?? "Unknown Author",
    status: "unavailable", // subjects endpoint doesn't return ebook_access
  }));
}
