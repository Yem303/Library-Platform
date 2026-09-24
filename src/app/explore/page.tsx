
import Link from "next/link";
import BookCard from "@/components/home/BookCard";
import { getBooks } from "@/lib/book";

const SUBJECTS = [
  "fantasy",
  "romance",
  "programming",
  "history",
  "science",
  "mystery",
];

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    subject?: string;
  }>;
}) {
  const { q, subject } = await searchParams;

  let books: any[] = [];
  let error = false;

  try {
    const searchQuery = subject || q?.trim() || "popular";

    books = await getBooks(searchQuery);
  } catch (err) {
    console.error("Failed to load books:", err);
    error = true;
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Explore Books</h1>

      <form action="/explore" className="mt-6 flex gap-2">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Search by title, author or subject..."
          className="h-12 flex-1 rounded-md border border-gray-300 bg-white px-4"
        />

        <button
          type="submit"
          className="h-12 rounded-md bg-[#1769b0] px-6 font-medium text-white hover:bg-[#0f5c9d]"
        >
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {SUBJECTS.map((s) => (
          <Link
            key={s}
            href={`/explore?subject=${encodeURIComponent(s)}`}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize ${
              subject === s
                ? "bg-[#1769b0] text-white"
                : "bg-blue-50 text-[#1769b0] hover:bg-blue-100"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {error && (
        <p className="mt-8 text-red-600">
          Couldn&apos;t load books from Open Library. Try again in a moment.
        </p>
      )}

      {!error && books.length === 0 && (
        <p className="mt-8 text-gray-500">No books found.</p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {books.map((book: any) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <BookCard
              title={book.title}
              coverUrl={book.coverUrl}
              status={book.status}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
