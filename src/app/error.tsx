"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto my-12 w-full max-w-4xl px-6 text-[#001C26] sm:my-20">
      <h1 className="text-3xl font-medium leading-tight sm:text-5xl">Something went wrong</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed">We could not load this page. Try again, or return to the homepage.</p>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <button type="button" onClick={() => reset()} className="min-h-[44px] bg-[#001C26] px-6 py-3 text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#001C26]">
          Try again
        </button>
        <Link href="/" className="inline-flex min-h-[44px] items-center underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#001C26]">Back to home</Link>
      </div>
    </main>
  );
}
