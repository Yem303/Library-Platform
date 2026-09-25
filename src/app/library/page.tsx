import LibraryList from "@/components/Library/LibraryList";
import { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://istad-library.vercel.app"),
  title: "My Library",
  description:
    "Manage your personal library with iSTAD Library. View and organize your favorite and borrowed books.",
  keywords: [
    "my library",
    "iSTAD Library",
    "favorite books",
    "borrowed books",
    "book collection",
    "online library",
  ],
  openGraph: {
    title: "My Library | iSTAD Library",
    description: "Manage your favorite and borrowed books with iSTAD Library.",
    images: ["thumdnail.png"],
  },
};
export default function Page() {
  return (
    <div className="mx-auto w-[80%] p-10">
      <LibraryList />
    </div>
  );
}
