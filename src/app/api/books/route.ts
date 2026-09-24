import { NextResponse } from "next/server";

interface StoredBook {
	id: string;
	title: string;
	author: string;
	genre: string;
	description: string;
	publishedYear: number;
	coverUrl: string;
}

interface OpenLibraryBook {
	key?: string;
	title?: string;
	cover_i?: number;
	author_name?: string[];
}

const globalForBooks = globalThis as typeof globalThis & {
	libraryBooks?: StoredBook[];
};

const books = globalForBooks.libraryBooks ?? (globalForBooks.libraryBooks = []);

const FEED_CATEGORIES = [
	"popular",
	"fiction",
	"classic",
	"romance",
	"mystery",
	"fantasy",
];

export async function GET() {
	try {
		const feedResults = await Promise.all(
			FEED_CATEGORIES.map(async (category) => {
				try {
					const response = await fetch(
						`https://openlibrary.org/search.json?q=${encodeURIComponent(category)}&limit=8`,
						{ next: { revalidate: 3600 } }
					);

					if (!response.ok) {
						return [] as StoredBook[];
					}

					const data = (await response.json()) as { docs?: OpenLibraryBook[] };
					const docs = Array.isArray(data.docs) ? data.docs : [];

					return docs
						.filter(
							(book): book is OpenLibraryBook =>
								Boolean(book) &&
								typeof book === "object" &&
								typeof book.key === "string" &&
								typeof book.title === "string"
						)
						.map((book) => ({
							id: book.key!.replace("/works/", ""),
							title: book.title!,
							author: book.author_name?.[0] ?? "Unknown Author",
							genre: category,
							description: "Shared from the website feed.",
							publishedYear: new Date().getFullYear(),
							coverUrl: book.cover_i
								? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
								: "/placeholder-book.jpg",
						}));
				} catch {
					return [] as StoredBook[];
				}
			})
		);

		const combined = [...books, ...feedResults.flat()];
		const uniqueBooks = combined.filter(
			(book, index, list) =>
				list.findIndex((item) => item.id === book.id) === index
		);

		return NextResponse.json(uniqueBooks);
	} catch {
		return NextResponse.json(books);
	}
}

export async function POST(request: Request) {
	const body = (await request.json()) as Partial<StoredBook>;
	const publishedYear = body.publishedYear;

	if (
		!body.title?.trim() ||
		!body.author?.trim() ||
		!body.genre?.trim() ||
		!body.description?.trim() ||
		typeof publishedYear !== "number" ||
		!Number.isInteger(publishedYear) ||
		publishedYear < 1000 ||
		publishedYear > new Date().getFullYear()
	) {
		return NextResponse.json(
			{ error: "Please provide valid book details." },
			{ status: 400 }
		);
	}

	const book: StoredBook = {
		id: crypto.randomUUID(),
		title: body.title.trim(),
		author: body.author.trim(),
		genre: body.genre.trim(),
		description: body.description.trim(),
		publishedYear,
		coverUrl: body.coverUrl || "/placeholder-book.jpg",
	};

	books.unshift(book);

	return NextResponse.json(book, { status: 201 });
}
