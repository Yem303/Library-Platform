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
<<<<<<< HEAD
  const [
    trendingBooks,
    programmingBooks,
    classicBooks,
    romanceBooks,
    fictionBooks,
    historyBooks,
    scienceBooks,
    fantasyBooks,
    mysteryBooks,
    biographyBooks,
    businessBooks,
    selfHelpBooks,
  ] = await Promise.all([
    getBooks("popular"),
    getBooks("programming"),
    getBooks("classic"),
    getBooks("romance"),
    getBooks("fiction"),
    getBooks("history"),
    getBooks("science"),
    getBooks("fantasy"),
    getBooks("mystery"),
    getBooks("biography"),
    getBooks("business"),
    getBooks("self-help"),
  ]);
=======
  const booksByCategory = await Promise.all(
    BOOK_CATEGORIES.map(async (category) => ({
      title: BOOK_CATEGORY_LABELS[category],
      books: await getBooks(category),
    }))
  );
>>>>>>> origin/piseth

  return (
    <>
      <Hero />

<<<<<<< HEAD
      <BookSection
        title="Trending Books"
        books={trendingBooks}
      />

      <BookSection
        title="Programming Books"
        books={programmingBooks}
      />

      <BookSection
        title="Classic Books"
        books={classicBooks}
      />

      <BookSection
        title="Romance Books"
        books={romanceBooks}
      />

      <BookSection
        title="Fiction Books"
        books={fictionBooks}
      />

      <BookSection
        title="History Books"
        books={historyBooks}
      />

      <BookSection
        title="Science Books"
        books={scienceBooks}
      />

      <BookSection
        title="Fantasy Books"
        books={fantasyBooks}
      />

      <BookSection
        title="Mystery Books"
        books={mysteryBooks}
      />

      <BookSection
        title="Biography Books"
        books={biographyBooks}
      />

      <BookSection
        title="Business Books"
        books={businessBooks}
      />

      <BookSection
        title="Self-Help Books"
        books={selfHelpBooks}
      />
=======
      {booksByCategory.map(({ title, books }) => (
        <BookSection key={title} title={title} books={books} />
      ))}
>>>>>>> origin/piseth
    </>
  );
}