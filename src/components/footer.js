import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 flex w-full flex-col gap-8 bg-black p-8 text-white">
      <Image height={100} width={100} className="w-[256px] max-w-full" src="/logo_w.svg" alt="Dev Club" />
      <div className="flex flex-col gap-6 text-sm leading-relaxed md:flex-row md:items-end md:justify-between">
        <p>
          Dev Club<br />
          Faculty of Information and Communication Technology, Mahidol University<br />
          999 Phuttamonthon 4 Road,<br />
          Salaya, Nakhon Pathom 73170<br />
          THAILAND
        </p>
        <p className="md:text-right">Copyright © {year}. Dev Club. All rights reserved.</p>
      </div>
    </footer>
  );
}
