import HeroSection from "@/components/home/hero-section";
import NewArrivalsSection from "@/components/home/new-arrivals-section";
import TopSellingSection from "@/components/home/top-selling-section";
import BrowseDressStyleSection from "@/components/home/browse-dress-style-section";
import TestimonialsSection from "@/components/home/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <NewArrivalsSection />

      <TopSellingSection />

      <BrowseDressStyleSection />

      <TestimonialsSection />
    </>
  );
}