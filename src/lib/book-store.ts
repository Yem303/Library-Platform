export interface StoredBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  publishedYear: number;
  coverUrl: string;
  isFavorite: boolean;
  isBorrowed: boolean;
}

const globalForBooks = globalThis as typeof globalThis & {
  libraryBooks?: StoredBook[];
};

export const books =
  globalForBooks.libraryBooks ?? (globalForBooks.libraryBooks = []);

export function getStoredBook(id: string) {
  return books.find((book) => book.id === id);
}