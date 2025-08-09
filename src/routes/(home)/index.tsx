import { createFileRoute } from "@tanstack/react-router";
import Hero from "~/components/home/hero";
import Header from "~/components/home/navigations/header";
import SellingSection from "~/components/home/selling-section";

export const Route = createFileRoute("/(home)/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <SellingSection />
    </div>
  );
}
