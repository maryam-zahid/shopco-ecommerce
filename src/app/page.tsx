import BrandStrip from "@/components/home/brand-strip";
import HeroSection from "@/components/home/hero-section";
import NewArrivalsSection from "@/components/home/new-arrivals-section";
import TopSellingSection from "@/components/home/top-selling-section";
import Header from "@/components/layout/header";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />

        <BrandStrip />

        <NewArrivalsSection />

        <TopSellingSection />
      </main>
    </>
  );
}