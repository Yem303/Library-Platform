import BookSection from "@/components/home/BookSection";
import { BOOK_CATEGORIES, BOOK_CATEGORY_LABELS, getBooks } from "@/lib/book";
import type { Metadata } from "next";
export const metadata: Metadata = {
  
  title: "Books",
  description:
    "Browse and discover books from the iSTAD Library collection. Explore books from different categories and authors.",
  keywords: [
    "iSTAD Library books",
    "books",
    "book collection",
    "online books",
    "book search",
    "programming books",
    "fiction books",
    "classic books",
    "romance books",
  ],
  openGraph: {
    title: "Books | iSTAD Library",
    description: "Browse and discover books from the iSTAD Library collection.",
    images: ["thumdnail.png"],
  },
};
export default async function BooksPage() {
  const booksByCategory = await Promise.all(
    BOOK_CATEGORIES.map(async (category) => ({
      title: BOOK_CATEGORY_LABELS[category],
      books: await getBooks(category),
    })),
  );

  return (
    <div className="mx-auto w-[90%] overflow-hidden py-8">
      {booksByCategory.map(({ title, books }) => (
        <BookSection key={title} title={title} books={books} />
      ))}
    </div>
  );
}
