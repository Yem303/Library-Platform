import BookCardComponentDetail from "@/components/books/BookCardComponentDetail";
import { getStoredBook } from "@/lib/book-store";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const storedBook = getStoredBook(id);

  if (storedBook) {
    return (
      <div>
        <BookCardComponentDetail
          id={id}
          title={storedBook.title}
          author={storedBook.author}
          coverUrl={storedBook.coverUrl}
          description={storedBook.description}
          publishedYear={storedBook.publishedYear}
          genres={[storedBook.genre]}
          isFavorite={storedBook.isFavorite}
          isBorrowed={storedBook.isBorrowed}
        />
      </div>
    );
  }

  let book: {
    title?: string;
    authors?: { author?: { key?: string } }[];
    description?: string | { value?: string };
    covers?: number[];
    first_publish_date?: string;
    subjects?: string[];
  } = {};

  try {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`, {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      book = await response.json();
    }
  } catch {
    book = {};
  }

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "";

  const coverUrl = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "/placeholder-book.jpg";

  const safeTitle = book.title ?? "Unknown title";
  const safeAuthor = book.authors?.[0]?.author?.key?.split("/").pop();
  const safePublishedYear = book.first_publish_date ?? "";
  const safeGenres = book.subjects?.slice(0, 5) ?? [];

  return (
    <div>
      <BookCardComponentDetail
          id={id}
        title={safeTitle}
        coverUrl={coverUrl}
          author={safeAuthor}
        description={description}
        publishedYear={safePublishedYear}
        genres={safeGenres}
      />
    </div>
  );
}