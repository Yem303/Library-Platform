export interface BorrowedBook {
  id: string;
  title: string;
  coverUrl: string;
  author?: string;
  borrowedAt: string;
}

const STORAGE_KEY = "istad-books:borrowed";

// Fired on the window whenever the borrowed list changes, so any mounted
// component (the library list, the borrow button) can re-read storage.
export const BORROWED_CHANGED_EVENT = "borrowed-books-changed";

function readStorage(): BorrowedBook[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(books: BorrowedBook[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  window.dispatchEvent(new Event(BORROWED_CHANGED_EVENT));
}

export function getBorrowedBooks(): BorrowedBook[] {
  return readStorage();
}

export function isBorrowed(id: string): boolean {
  return readStorage().some((book) => book.id === id);
}

export function borrowBook(book: Omit<BorrowedBook, "borrowedAt">) {
  const books = readStorage();

  if (books.some((item) => item.id === book.id)) {
    return;
  }

  writeStorage([
    ...books,
    { ...book, borrowedAt: new Date().toISOString() },
  ]);
}

export function returnBook(id: string) {
  writeStorage(readStorage().filter((book) => book.id !== id));
}
