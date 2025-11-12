import { About } from "@/components/About";
import { Cta } from "@/components/Cta";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { ProblemSection } from "@/components/ProblemSection";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Sponsors } from "@/components/Sponsors";
import { Testimonials } from "@/components/Testimonials";

export function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <ProblemSection />
      <HowItWorks />
      {/* <Features /> */}
      {/* <Services /> */}
      
      <Testimonials />
      <Cta />
      {/* <Team /> */}
      {/* <Pricing /> */}
      {/* <Newsletter /> */}
      <FAQ />
      {/* <Footer /> */}
      <ScrollToTop />
    </>
  );
}