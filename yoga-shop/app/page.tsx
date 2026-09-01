import { Hero } from "@/components/sections/Hero";
import { Departments } from "@/components/sections/Departments";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { WhyTheseProducts } from "@/components/sections/WhyTheseProducts";
import { Materials } from "@/components/sections/Materials";
import { Benefits } from "@/components/sections/Benefits";
import { LifestyleBanner } from "@/components/sections/LifestyleBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function ShopLandingPage() {
  return (
    <>
      <Hero />
      <Departments />
      <FeaturedCollection />
      <WhyTheseProducts />
      <Materials />
      <Benefits />
      <LifestyleBanner />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
