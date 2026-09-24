
import BookSection from "@/components/home/BookSection";
import { BOOK_CATEGORIES, BOOK_CATEGORY_LABELS, getBooks } from "@/lib/book";

export default async function BooksPage() {
  const booksByCategory = await Promise.all(
    BOOK_CATEGORIES.map(async (category) => ({
      title: BOOK_CATEGORY_LABELS[category],
      books: await getBooks(category),
    }))
  );

  return (
    <div className="mx-auto w-[90%] overflow-hidden py-8">
      {booksByCategory.map(({ title, books }) => (
        <BookSection key={title} title={title} books={books} />
      ))}
    </div>
  );
}