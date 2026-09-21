
import Hero from "@/components/home/Hero";
import BookSection from "@/components/home/BookSection";
import { getBooks } from "@/lib/book";

export default async function Home() {
  const [
    trendingBooks,
    classicBooks,
    programmingBooks,
    romanceBooks,
  ] = await Promise.all([
    getBooks("popular"),
    getBooks("classic"),
    getBooks("programming"),
    getBooks("romance"),
  ]);

  return (
    <>
      <Hero />

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
    </>
  );
}