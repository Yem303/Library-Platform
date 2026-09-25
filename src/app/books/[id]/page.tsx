import BookCardComponentDetail from "@/components/books/BookCardComponentDetail";
import { getStoredBook } from "@/lib/book-store";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const storedBook = getStoredBook(id);

<<<<<<< HEAD
  const url = `https://openlibrary.org/works/${id}.json`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });
=======
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
>>>>>>> origin/piseth

    if (!response.ok) {
      throw new Error(
        `OpenLibrary fetch failed: ${response.status} ${response.statusText}`
      );
    }

    const book = await response.json();

<<<<<<< HEAD
    // Get description safely
    const description =
      typeof book?.description === "string"
        ? book.description
        : book?.description?.value ?? "";

    // Get first cover safely
    const coverUrl =
      Array.isArray(book?.covers) && book.covers.length > 0
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
        : "/placeholder-book.jpg";

    // Get publish date
    const publisher =
      book?.first_publish_date ?? book?.created?.value ?? "";

    // Get genres / subjects
    const genres = Array.isArray(book?.subjects)
      ? book.subjects.slice(0, 5)
      : [];

    return (
      <div>
        <BookCardComponentDetail
          id={id}
          title={book?.title ?? "Untitled"}
          coverUrl={coverUrl}
          description={description}
          publisher={publisher}
          author=""
          publishDate={book?.first_publish_date ?? ""}
          subjects={genres}
        />
      </div>
    );
  } catch (err) {
    console.error("Error fetching book from OpenLibrary:", err);

    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Unable to load book
        </h1>

        <p className="mt-2 text-gray-500">
          There was an error loading the requested book.
          Please try again later.
        </p>
      </div>
    );
  }
=======
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
>>>>>>> origin/piseth
}