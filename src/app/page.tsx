
import Hero from "@/components/home/Hero";
import BookSection from "@/components/home/BookSection";
import {
  BOOK_CATEGORIES,
  BOOK_CATEGORY_LABELS,
  getBooks,
} from "@/lib/book";

const GENRE_CHIPS = [
  "Classics",
  "Fiction",
  "Romance",
  "Drama",
  "Gothic",
  "Dystopian",
  "Adventure",
  "Poetry",
  "Mystery",
  "Fantasy",
];

export default async function Home() {
  const booksByCategory = await Promise.all(
    BOOK_CATEGORIES.map(async (category) => ({
      title: BOOK_CATEGORY_LABELS[category],
      books: await getBooks(category),
    }))
  );

  return (
    <>
      <Hero />

      {booksByCategory.map(({ title, books }) => (
        <BookSection key={title} title={title} books={books} />
      ))}
    </>
  );
}