import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Ecomiq } from "~/components/svgs/ecomiq";
import { useTheme } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <header
      className={`sticky top-0 left-0 z-50 mx-auto w-full border-b border-[--border] px-5 backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <Ecomiq className="h-auto w-8.5" />
        </Link>
        <nav className="hidden gap-8 md:flex">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Features
          </Link>
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Testimonials
          </Link>
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            FAQ
          </Link>
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link to="/auth/signup">
            <Button className="bg-brand hover:bg-primary-secondary group inline-flex h-max w-full cursor-pointer items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(249,129,99,1)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_#F97452_inset] transition-colors duration-300 ease-in-out hover:translate-y-0.5 hover:shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(252,199,185,0.8)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_hsla(0,_0%,_100%,_0.25)_inset] focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:shadow-xs disabled:hover:shadow-xs">
              Get Started
              <Icon
                icon="lucide-arrow-right"
                className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-background/95 absolute inset-x-0 top-16 border-b p-4 backdrop-blur-lg md:hidden"
        >
          <div className="container flex flex-col gap-4 py-4">
            <Link
              to="/"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              to="/"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col gap-2 border-t pt-2">
              <Link to="/">
                <Button className="bg-brand hover:bg-primary-secondary group inline-flex h-max w-full cursor-pointer items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-white shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(249,129,99,1)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_#F97452_inset] transition-colors duration-300 ease-in-out hover:translate-y-0.5 hover:shadow-[0rem_-0.0625rem_0rem_0.0625rem_rgba(252,199,185,0.8)_inset,_0rem_0rem_0rem_0.0625rem_#F97452_inset,_0rem_0.03125rem_0rem_0.09375rem_hsla(0,_0%,_100%,_0.25)_inset] focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:shadow-xs disabled:hover:shadow-xs">
                  Get Started
                  <Icon
                    icon="lucide-arrow-right"
                    className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
