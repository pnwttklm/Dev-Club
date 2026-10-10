import Header from "../components/index_c/header";
import Location from "../components/index_c/location";
import Teams from "../components/index_c/teams";
import WhyUs from "../components/index_c/whyUs";
import Questions from "../components/questionCard";
import { LandingMotionProvider } from '../components/landing/motion-provider';

export default function Home() {
  return (
    <LandingMotionProvider><main id="main-content" tabIndex={-1}>
      <Header />
      <section id="location" className="landing-section"><h2>Location</h2><Location /></section>
      <section id="why-us" className="landing-section"><WhyUs /></section>
      <section id="teams" className="landing-section"><Teams /></section>
      <section id="faqs" className="landing-section"><h2>QUESTIONS...?</h2><div className="mx-auto mt-10 max-w-4xl"><Questions /></div></section>
    </main></LandingMotionProvider>
  );
}
