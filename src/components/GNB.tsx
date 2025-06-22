import Link from "next/link";

export default function GNB() {
  return (
    <nav className="bg-white h-16 w-full">
      <Link href="/">
        <span className="max-w-6xl mx-auto text-xl font-bold text-primary flex items-center h-full">
          QUIZ Factory
        </span>
      </Link>
    </nav>
  );
}
