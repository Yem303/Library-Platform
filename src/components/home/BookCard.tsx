import type { BookAvailabilityStatus } from "@/types/book";

interface BookCardProps {
  title: string;
  coverUrl: string;
  status: BookAvailabilityStatus;
  href?: string;
}

const BUTTON_CONFIG: Record<
  BookAvailabilityStatus,
  {
    label: string;
    showIcon: boolean;
  }
> = {
  available: {
    label: "Borrow",
    showIcon: false,
  },
  borrow_available: {
    label: "Borrow",
    showIcon: false,
  },
  preview: {
    label: "Read",
    showIcon: true,
  },
  unavailable: {
    label: "Nearby Libraries",
    showIcon: true,
  },
};

export default function BookCard({
  title,
  coverUrl,
  status,
}: BookCardProps) {
  const { label, showIcon } = BUTTON_CONFIG[status];

  return (
    <div className="group flex flex-col">
      {/* Book Cover */}
      <div className="overflow-hidden rounded-md bg-gray-100 shadow-sm">
        <img
          src={coverUrl}
          alt={title}
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
      <div
        className="
          mt-3 flex h-[44px] items-center justify-center gap-2
          rounded-md bg-[#1769b0] text-sm font-medium text-white
          transition-all duration-200
          hover:bg-[#0f5c9d]
        "
      >
        <span>{label}</span>

        {showIcon && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
          </svg>
        )}
      </div>
    </div>
  );
}