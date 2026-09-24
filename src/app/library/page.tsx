import BookCardComponentList from "@/components/books/BookCardComponentList";

export default function LibraryPage() {
  return (
    <main className="mx-auto w-[80%] overflow-hidden p-10">
      <h1 className="mb-8 text-4xl font-bold">Library</h1>
      <BookCardComponentList />
    </main>
  );
}