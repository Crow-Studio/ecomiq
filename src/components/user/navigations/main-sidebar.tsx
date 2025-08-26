import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Ecomiq } from "~/components/svgs/ecomiq";
import { Separator } from "~/components/ui/separator";
import { TooltipProvider } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { StoreWithMembers, User } from "~/use-cases/types";
import { TooltipWrapper } from "./tooltp-wrapper";
interface NavItem {
  icon: string;
  label: string;
}

interface Props {
  user: User;
  store: StoreWithMembers;
}

export default function MainSidebar({ user, store }: Props) {
  const {
    location: { pathname },
  } = useRouterState();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const onNavigateToRoute = (pathname: string) => {
    return navigate({
      to: `/user/$userId/store/$storeId/${pathname}`,
      params: {
        storeId: store.id,
        userId: user.id,
      },
    });
  };

  useEffect(() => {
    const checkIsMobile = () => {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile && !isCollapsed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isCollapsed]);

  const toggleSidebar = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  const closeSidebar = (): void => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  const navItems: NavItem[] = [
    { icon: "hugeicons:home-03", label: "Dashboard" },
    { icon: "hugeicons:shopping-basket-02", label: "Products" },
    { icon: "hugeicons:shopping-cart-02", label: "Orders" },
    { icon: "hugeicons:user-group-03", label: "Customers" },
  ];

  const storeNavTools: NavItem[] = [
    { icon: "hugeicons:megaphone-03", label: "Campaign" },
    { icon: "hugeicons:add-team-02", label: "Team" },
    { icon: "hugeicons:chart-02", label: "Analytics" },
    { icon: "hugeicons:wallet-02", label: "Payments" },
  ];

  const bottomNavItems: NavItem[] = [
    { icon: "hugeicons:customer-support", label: "Support" },
    { icon: "hugeicons:settings-02", label: "Settings" },
  ];

  const navLinkClasses = `
    hover:bg-background dark:hover:bg-[#313131] text-muted-foreground hover:text-primary
    flex w-full items-center gap-x-2 rounded-md p-2
    transition-colors duration-500 ease-in-out cursor-pointer
    ${isCollapsed ? "justify-center" : ""}
  `.trim();

  return (
    <>
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}
      <TooltipProvider>
        <nav
          className={`border-border flex overflow-x-hidden h-screen shrink-0 flex-col space-y-2 border-r bg-[#f3f4f8] p-1 transition-all duration-300 ease-in-out dark:bg-[#171717] ${
            isMobile
              ? `fixed top-0 left-0 z-50 ${isCollapsed ? "w-16" : "w-64"}`
              : `${isCollapsed ? "w-16" : "w-64"}`
          } `}
        >
          <div
            className={`flex flex-shrink-0 items-center gap-x-2 p-2 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Ecomiq className="h-auto w-6 flex-shrink-0" />
            {!isCollapsed && (
              <h1 className="text-xl font-semibold whitespace-nowrap">Ecomiq</h1>
            )}
          </div>

          <div className="flex-1 space-y-1 overflow-x-hidden overflow-y-auto">
            {navItems.map((item) => (
              <TooltipWrapper
                key={item.label}
                content={item.label}
                disabled={!isCollapsed}
              >
                <button
                  onClickCapture={() => onNavigateToRoute(item.label.toLocaleLowerCase())}
                  type="button"
                  className={cn(
                    "text-muted-foreground flex w-full cursor-pointer items-center gap-x-2 rounded-md p-2 transition-colors duration-500 ease-in-out",
                    pathname ===
                      `/user/${user.id}/store/${store.id}/${item.label.toLocaleLowerCase()}`
                      ? "bg-background text-primary dark:bg-[#313131]"
                      : "hover:bg-background hover:text-primary dark:hover:bg-[#313131]",
                    isCollapsed && "justify-center",
                  )}
                  onClick={closeSidebar}
                >
                  <Icon icon={item.icon} className="size-6 flex-shrink-0" />
                  {!isCollapsed && <p>{item.label}</p>}
                </button>
              </TooltipWrapper>
            ))}
            <Separator />
            {storeNavTools.map((item) => (
              <TooltipWrapper
                key={item.label}
                content={item.label}
                disabled={!isCollapsed}
              >
                <button
                  onClickCapture={() => onNavigateToRoute(item.label.toLocaleLowerCase())}
                  type="button"
                  className={cn(
                    "text-muted-foreground flex w-full cursor-pointer items-center gap-x-2 rounded-md p-2 transition-colors duration-500 ease-in-out",
                    pathname ===
                      `/user/${user.id}/store/${store.id}/${item.label.toLocaleLowerCase()}`
                      ? "bg-background text-primary dark:bg-[#313131]"
                      : "hover:bg-background hover:text-primary dark:hover:bg-[#313131]",
                    isCollapsed && "justify-center",
                  )}
                  onClick={closeSidebar}
                >
                  <Icon icon={item.icon} className="size-6 flex-shrink-0" />
                  {!isCollapsed && <p>{item.label}</p>}
                </button>
              </TooltipWrapper>
            ))}
          </div>
          <div className="flex-shrink-0 space-y-2">
            {bottomNavItems.map((item) => (
              <TooltipWrapper
                key={item.label}
                content={item.label}
                disabled={!isCollapsed}
              >
                <button
                  onClickCapture={() => onNavigateToRoute(item.label.toLocaleLowerCase())}
                  type="button"
                  className={cn(
                    "text-muted-foreground flex w-full cursor-pointer items-center gap-x-2 rounded-md p-2 transition-colors duration-500 ease-in-out",
                    pathname ===
                      `/user/${user.id}/store/${store.id}/${item.label.toLocaleLowerCase()}`
                      ? "bg-background text-primary dark:bg-[#313131]"
                      : "hover:bg-background hover:text-primary dark:hover:bg-[#313131]",
                    isCollapsed && "justify-center",
                  )}
                  onClick={closeSidebar}
                >
                  <Icon icon={item.icon} className="size-6 flex-shrink-0" />
                  {!isCollapsed && <p>{item.label}</p>}
                </button>
              </TooltipWrapper>
            ))}
            <TooltipWrapper
              content={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              disabled={false}
            >
              <button
                type="button"
                onClick={toggleSidebar}
                className={navLinkClasses}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Icon
                  icon={
                    isCollapsed ? "hugeicons:arrow-right-02" : "hugeicons:arrow-left-02"
                  }
                  className="size-6 flex-shrink-0"
                />
                {!isCollapsed && <p>Collapse</p>}
              </button>
            </TooltipWrapper>
          </div>
        </nav>
      </TooltipProvider>
    </>
  );
}
