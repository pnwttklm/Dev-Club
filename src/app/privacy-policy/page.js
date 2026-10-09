import Link from "next/link";

export default function ReviewNotice() {
  return (
    <main className="mx-auto my-24 max-w-3xl px-6 text-black">
      <h1 className="text-3xl md:text-4xl">Privacy policy</h1>
      <p className="mt-6 text-lg leading-relaxed">This page is under review. Updated information will be published when confirmed.</p>
      <Link href="/" className="mt-8 inline-block underline underline-offset-4">Back to Dev Club</Link>
    </main>
  );
}
