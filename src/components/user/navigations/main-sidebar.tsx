import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Ecomiq } from "~/components/svgs/ecomiq";
import { Separator } from "~/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface TooltipWrapperProps {
  children: ReactNode;
  content: string;
  disabled?: boolean;
}

const TooltipWrapper = ({ children, content, disabled = false }: TooltipWrapperProps) => {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" className="text-primary ml-2 bg-[#f3f4f8]">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};

interface NavItem {
  to: string;
  icon: string;
  label: string;
}

export default function MainSidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems: NavItem[] = [
    { to: "/", icon: "hugeicons:home-03", label: "Dashboard" },
    { to: "/products", icon: "hugeicons:shopping-basket-02", label: "Products" },
    { to: "/orders", icon: "hugeicons:shopping-cart-02", label: "Orders" },
    { to: "/customers", icon: "hugeicons:user-group-03", label: "Customers" },
  ];

  const navLinkClasses = `
    hover:bg-background text-muted-foreground hover:text-primary
    flex w-full items-center gap-x-2 rounded-md p-2
    transition-colors duration-500 ease-in-out cursor-pointer
    ${isCollapsed ? "justify-center" : ""}
  `.trim();

  return (
    <TooltipProvider>
      <nav
        className={`sticky flex h-svh flex-col space-y-2 bg-[#f3f4f8] p-1 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-x-2 p-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <Ecomiq className="h-auto w-6 flex-shrink-0" />
          {!isCollapsed && (
            <h1 className="text-xl font-semibold whitespace-nowrap">Ecomiq</h1>
          )}
        </div>

        {/* Main Navigation */}
        <div className="flex-1 space-y-1">
          {navItems.map((item) => (
            <TooltipWrapper key={item.label} content={item.label} disabled={!isCollapsed}>
              <Link to={item.to} className={navLinkClasses}>
                <Icon icon={item.icon} className="size-6 flex-shrink-0" />
                {!isCollapsed && <p>{item.label}</p>}
              </Link>
            </TooltipWrapper>
          ))}

          <Separator />
          <TooltipWrapper content="Campaign" disabled={!isCollapsed}>
            <Link to="/" className={navLinkClasses}>
              <Icon icon="hugeicons:megaphone-03" className="size-6 flex-shrink-0" />
              {!isCollapsed && <p>Campaign</p>}
            </Link>
          </TooltipWrapper>
          <TooltipWrapper content="Team" disabled={!isCollapsed}>
            <Link to="/" className={navLinkClasses}>
              <Icon icon="hugeicons:add-team-02" className="size-6 flex-shrink-0" />
              {!isCollapsed && <p>Team</p>}
            </Link>
          </TooltipWrapper>
          <TooltipWrapper content="Analytics" disabled={!isCollapsed}>
            <Link to="/" className={navLinkClasses}>
              <Icon icon="hugeicons:chart-02" className="size-6 flex-shrink-0" />
              {!isCollapsed && <p>Analytics</p>}
            </Link>
          </TooltipWrapper>
          <TooltipWrapper content="Payments" disabled={!isCollapsed}>
            <Link to="/" className={navLinkClasses}>
              <Icon icon="hugeicons:wallet-02" className="size-6 flex-shrink-0" />
              {!isCollapsed && <p>Payments</p>}
            </Link>
          </TooltipWrapper>
        </div>

        {/* Bottom Section */}
        <div className="space-y-2">
          <TooltipWrapper content="Support" disabled={!isCollapsed}>
            <Link to="/" className={navLinkClasses}>
              <Icon icon="hugeicons:customer-support" className="size-6 flex-shrink-0" />
              {!isCollapsed && <p>Support</p>}
            </Link>
          </TooltipWrapper>
          <TooltipWrapper content="Settings" disabled={!isCollapsed}>
            <Link to="/" className={navLinkClasses}>
              <Icon icon="hugeicons:settings-02" className="size-6 flex-shrink-0" />
              {!isCollapsed && <p>Settings</p>}
            </Link>
          </TooltipWrapper>

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
  );
}
