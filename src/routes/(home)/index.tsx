import { createFileRoute, redirect } from "@tanstack/react-router";
import Faqs from "~/components/home/faqs";
import Hero from "~/components/home/hero";
import Footer from "~/components/home/navigations/footer";
import Header from "~/components/home/navigations/header";
import Pricing from "~/components/home/pricing";
import SellingSection from "~/components/home/selling-section";
import { TestimonialsGrid } from "~/components/home/testimonials-grid";

export const Route = createFileRoute("/(home)/")({
  component: Home,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <SellingSection />
      <TestimonialsGrid />
      <Pricing />
      <Faqs />
      <Footer />
    </div>
  );
}
