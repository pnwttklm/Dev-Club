import Link from "next/link";

export default function FW() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto my-12 w-full max-w-4xl px-6 py-6 text-[#001C26] sm:my-20 sm:py-12">
      <h1 className="max-w-2xl text-3xl font-medium leading-tight sm:text-5xl">Frontend tracking is currently unavailable</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">The external tracking resource is not available through this website.</p>
      <Link href="/" prefetch={false} className="mt-8 inline-flex min-h-[44px] items-center underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#001C26]">Back to Dev Club</Link>
    </main>
  );
}
