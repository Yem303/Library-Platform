export type BookAvailabilityStatus =
  | "available"
  | "borrow_available"
  | "preview"
  | "unavailable";

export interface Book {
  id: string;
  title: string;
  coverUrl: string;
  status: BookAvailabilityStatus;
  href?: string;
}