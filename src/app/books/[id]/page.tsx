import BookCardComponentDetail from "@/components/books/BookCardComponentDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `https://openlibrary.org/works/${id}.json`
  );

  const book = await response.json();

  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "";

  const coverUrl = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "/placeholder-book.jpg";

  return (
    <div>
      <BookCardComponentDetail
        id={id}
        title={book.title}
        coverUrl={coverUrl}
        description={description}
        publishedYear={book.first_publish_date}
        genres={book.subjects?.slice(0, 5) || []}
      />
    </div>
  );
}