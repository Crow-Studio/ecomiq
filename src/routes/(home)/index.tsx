import { createFileRoute, redirect } from "@tanstack/react-router";
import Faqs from "~/components/home/faqs";
import Hero from "~/components/home/hero";
import Footer from "~/components/home/navigations/footer";
import Header from "~/components/home/navigations/header";
import Pricing from "~/components/home/pricing";
import SellingSection from "~/components/home/selling-section";
import { TestimonialsGrid } from "~/components/home/testimonials-grid";
import { checkAuthenticatedUser } from "~/lib/auth/functions/auth";

export const Route = createFileRoute("/(home)/")({
  component: Home,
  beforeLoad: async () => {
    const REDIRECT_URL = "/dashboard";

    const { user } = await checkAuthenticatedUser();

    if (user) {
      throw redirect({
        to: REDIRECT_URL,
      });
    }

    return {
      redirectUrl: REDIRECT_URL,
    };
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
