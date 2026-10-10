import { documentFont } from '../document-font';
export const metadata = { title: "Acknowledgement | MUICT Dev Club" };

export default function Acknowledgement() {
  return (
    <main id="main-content" tabIndex={-1} className={`${documentFont.className} ${documentFont.variable} mx-auto my-auto flex w-full max-w-[75ch] flex-1 flex-col justify-center px-6 py-24 text-base leading-7 text-black`}>
      <h1 className="mb-8 text-3xl font-semibold leading-tight md:text-4xl">Acknowledgement</h1>
      <p className="mb-3 text-xl">This website has been developed by</p>
      <p className="text-xl">Poonyawatt Klumnaim - Faculty of ICT</p>
    </main>
  );
}
