import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#0f172a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold"
            >
              📚 Library
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Discover, explore, and enjoy thousands of books.
              Find your next favorite book with our online library.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/books" className="hover:text-white transition">
                  Books
                </Link>
              </li>

              <li>
                <Link href="/add-book" className="hover:text-white transition">
                  Add Book
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Categories
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/books?category=programming" className="hover:text-white transition">
                  Programming
                </Link>
              </li>

              <li>
                <Link href="/books?category=classic" className="hover:text-white transition">
                  Classic
                </Link>
              </li>

              <li>
                <Link href="/books?category=romance" className="hover:text-white transition">
                  Romance
                </Link>
              </li>

              <li>
                <Link href="/books?category=popular" className="hover:text-white transition">
                  Popular
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="/help" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p>
              © {new Date().getFullYear()} Library Platform. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="hover:text-white transition"
              >
                Facebook
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                Instagram
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}