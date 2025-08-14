import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input, type InputProps } from "~/components/ui/input";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface PasswordInputProps extends InputProps {
  ref?: React.Ref<HTMLInputElement>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ className, ref, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        ref={ref}
        {...props}
        placeholder="e.g secretkey"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.value === "" || props.disabled}
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
};

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
