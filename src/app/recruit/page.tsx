import Link from "next/link";

export default function RecruitmentPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto my-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-12 sm:py-20">
      <section className="rounded-3xl bg-gradient-to-br from-[#9C58FD]/20 to-[#74DAFF]/30 px-6 py-12 text-[#001C26] sm:px-12 sm:py-16">
        <h1 className="max-w-2xl text-3xl font-medium leading-tight sm:text-5xl">
          Applications are currently closed
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
          Recruitment details are being confirmed. Please check back for updates.
        </p>
        <Link href="/" prefetch={false} className="mt-8 inline-flex min-h-[44px] items-center underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#001C26]">
          Back to MUICT Dev Club
        </Link>
      </section>
    </main>
  );
}
