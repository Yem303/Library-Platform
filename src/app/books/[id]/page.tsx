import BookCardComponentDetail from "@/components/books/BookCardComponentDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let book: {
    title?: string;
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
  const safePublishedYear = book.first_publish_date ?? "";
  const safeGenres = book.subjects?.slice(0, 5) ?? [];

  return (
    <div>
      <BookCardComponentDetail
        title={safeTitle}
        coverUrl={coverUrl}
        description={description}
        publishedYear={safePublishedYear}
        genres={safeGenres}
      />
    </div>
  );
}