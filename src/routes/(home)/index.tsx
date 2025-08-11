import { createFileRoute } from "@tanstack/react-router";
import Faqs from "~/components/home/faqs";
import Hero from "~/components/home/hero";
import Footer from "~/components/home/navigations/footer";
import Header from "~/components/home/navigations/header";
import Pricing from "~/components/home/pricing";
import SellingSection from "~/components/home/selling-section";
import { TestimonialsGrid } from "~/components/home/testimonials-grid";

export const Route = createFileRoute("/(home)/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <SellingSection />
        <TestimonialsGrid />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </div>
  );
}
