<<<<<<< HEAD
import LibraryList from "@/components/Library/LibraryList";

export default function Page() {
  return (
    <div className="mx-auto w-[80%] p-10">
      <LibraryList />
    </div>
  );
}
=======
import BookCardComponentList from "@/components/books/BookCardComponentList";

export default function LibraryPage() {
  return (
    <main className="mx-auto w-[80%] overflow-hidden p-10">
      <h1 className="mb-8 text-4xl font-bold">Library</h1>
      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-semibold">Favorites</h2>
        <BookCardComponentList collection="favorites" />
      </section>
      <section>
        <h2 className="mb-5 text-2xl font-semibold">Borrowed Books</h2>
        <BookCardComponentList collection="borrowed" />
      </section>
    </main>
  );
}
>>>>>>> origin/piseth
