"use client";

import { useEffect, useState } from "react";
import {
  BORROWED_CHANGED_EVENT,
  borrowBook,
  isBorrowed,
  returnBook,
} from "@/lib/borrowed";

interface BorrowButtonProps {
  id: string;
  title: string;
  coverUrl: string;
  author?: string;
}

export default function BorrowButton(props: BorrowButtonProps) {
  const [borrowed, setBorrowed] = useState(false);

  useEffect(() => {
    function sync() {
      setBorrowed(isBorrowed(props.id));
    }

    sync();

    window.addEventListener(BORROWED_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(BORROWED_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [props.id]);

  function handleClick() {
    if (borrowed) {
      returnBook(props.id);
      return;
    }

    borrowBook({
      id: props.id,
      title: props.title,
      coverUrl: props.coverUrl,
      author: props.author,
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        inline-flex
        h-12
        items-center
        justify-center
        rounded-md
        px-7
        text-sm
        font-semibold
        transition
        ${
          borrowed
            ? "border border-[#1769b0] text-[#1769b0] hover:bg-blue-50"
            : "bg-[#1769b0] text-white hover:bg-[#0f5c9d]"
        }
      `}
    >
      {borrowed ? "Return Book" : "Borrow Book"}
    </button>
  );
}
