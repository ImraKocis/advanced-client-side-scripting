import * as React from "react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { EyeIcon, LockIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const initialType = type;
    const handleType = () => {
      setIsShown((prevState) => !prevState);
    };

    return (
      <div className="relative">
        <input
          type={isShown ? "text" : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {initialType == "password" ? (
          <div className="absolute m-auto top-0 right-0 bottom-0 mr-1">
            <button
              onClick={() => handleType()}
              className="flex h-full items-center"
            >
              {isShown ? (
                <LockIcon className="w-6 h-6 px-1" />
              ) : (
                <EyeIcon className="w-6 h-6 px-1" />
              )}
            </button>
          </div>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
