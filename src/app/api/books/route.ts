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

const globalForBooks = globalThis as typeof globalThis & {
	libraryBooks?: StoredBook[];
};

const books = globalForBooks.libraryBooks ?? (globalForBooks.libraryBooks = []);

export async function GET() {
	return NextResponse.json(books);
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
