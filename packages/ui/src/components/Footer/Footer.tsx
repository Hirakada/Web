import Link from "next/link";

export interface FooterProps {
  brand?: string;
  href?: string;
  startYear?: number;
}

export default function Footer({
  brand = "Hirakada",
  href = "/",
  startYear = new Date().getFullYear(),
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const year =
    startYear === currentYear
      ? currentYear
      : `${startYear}–${currentYear}`;

  return (
    <footer className="py-6">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-neutral-500">
        <p>
          © {year}{" "}
          <Link
            href={href}
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {brand}
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}