import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto my-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 text-[#001C26] py-12 sm:py-20">
      <h1 className="text-3xl font-medium leading-tight sm:text-5xl">Page not found</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">This page is no longer available. Explore MUICT Dev Club from the homepage.</p>
      <Link href="/" className="mt-8 inline-flex min-h-[44px] items-center underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#001C26]">
        Back to home
      </Link>
    </main>
  );
}