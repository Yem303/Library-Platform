"use client";

export interface BookType {
  id: string;
  title: string;
  coverUrl: string;
  href?: string;
}

function BookCardComponent(props: BookType) {
  return (
    <div
      className="
        group
        w-[260px]
        min-w-[260px]
        overflow-hidden
        transition-all
        duration-300
      "
    >
      {/* Book Cover */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={props.coverUrl || "/placeholder-book.png"}
          alt={props.title}
          className="
            aspect-[2/3]
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* Action Button */}
      <div className="mt-3">
        <a
          href={props.href ?? "#"}
          className="
            flex
            h-[51px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-md
            bg-[#1769b0]
            text-sm
            font-medium
            text-white
            transition-all
            duration-200
            hover:bg-[#0f5c9d]
            hover:shadow-md
            active:scale-[0.98]
          "
        >
          <span>Borrow</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="
              h-4
              w-4
              transition-transform
              duration-200
              group-hover:translate-x-0.5
            "
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default BookCardComponent;