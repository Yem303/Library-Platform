
import BookCardComponentList from "@/components/books/BookCardComponentList";
import { getBooks } from "@/lib/book";

function page() {


  return (
    <div className="mx-auto w-[80%] overflow-hidden p-10">
      <BookCardComponentList/>
    </div>
  );
}

export default page;