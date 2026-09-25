import { NextResponse } from "next/server";
import { books, type StoredBook } from "@/lib/book-store";

export async function GET() {
	return NextResponse.json(
		books.filter((book) => book.isFavorite || book.isBorrowed)
	);
}

export async function POST(request: Request) {
	const body = (await request.json()) as Partial<StoredBook> & {
		action?: "favorite" | "borrow";
	};
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
		id: body.id?.trim() || crypto.randomUUID(),
		title: body.title.trim(),
		author: body.author.trim(),
		genre: body.genre.trim(),
		description: body.description.trim(),
		publishedYear,
		coverUrl: body.coverUrl || "/placeholder-book.jpg",
		isFavorite: body.isFavorite === true || body.action === "favorite",
		isBorrowed: body.isBorrowed === true || body.action === "borrow",
	};
	const existingBook = books.find((storedBook) => storedBook.id === book.id);
	if (existingBook) {
		if (book.isFavorite) {
			existingBook.isFavorite = true;
		}
		if (book.isBorrowed) {
			existingBook.isBorrowed = true;
		}
		return NextResponse.json(existingBook);
	}

	books.unshift(book);

	return NextResponse.json(book, { status: 201 });
}
