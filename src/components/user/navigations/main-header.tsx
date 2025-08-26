import { StoreWithRole } from "~/data-access/stores";
import { useSearchCommand } from "~/hooks/use-search-command";
import { StoreWithMembers, User } from "~/use-cases/types";
import HeaderUser from "./header-user";
import { SearchCommand } from "./search/search-command";
import { SearchTrigger } from "./search/search-trigger";

interface Props {
  user: User;
  stores: StoreWithRole[];
  store: StoreWithMembers;
}

export default function MainHeader({ user, store }: Props) {
  const { open, setOpen } = useSearchCommand();
  return (
    <>
      <header className="border-border flex flex-shrink-0 items-center justify-between border-b bg-[#f3f4f8] px-4 py-2 dark:bg-[#171717]">
        <div>/ Dashboard</div>
        <div className="flex flex-1 items-center justify-center sm:px-4">
          <SearchTrigger onClick={() => setOpen(true)} />
        </div>
        <HeaderUser user={user} />
      </header>
      <SearchCommand open={open} setOpen={setOpen} user={user} store={store} />
    </>
  );
}
