import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";

interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <Button
      variant="outline"
      className="text-muted-foreground relative justify-start rounded-full text-sm font-normal shadow-none sm:w-full sm:max-w-sm sm:pr-12 md:w-40 lg:w-64"
      onClick={onClick}
    >
      <Search className="h-4 w-4 sm:mr-2" />
      <span className="hidden lg:inline-flex">Search or Press</span>
      <kbd className="bg-muted pointer-events-none absolute top-1.5 right-1.5 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
