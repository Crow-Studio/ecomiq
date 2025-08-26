import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

interface TooltipWrapperProps {
  children: ReactNode;
  content: string;
  disabled?: boolean;
}

export const TooltipWrapper = ({
  children,
  content,
  disabled = false,
}: TooltipWrapperProps) => {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger className="border-0 outline-0" asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="text-primary ml-2 bg-[#f3f4f8] dark:bg-[#171717]"
      >
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
};
