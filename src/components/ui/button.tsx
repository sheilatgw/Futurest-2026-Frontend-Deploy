import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        // Custom variants from previous file used in project
        orange:
          "text-white bg-orange-20 hover:bg-orange-30 active:bg-orange-20 focus-visible:ring-orange-20 disabled:bg-orange-10",
        plum: "text-white bg-plum-20 hover:bg-plum-30 active:bg-plum-20 focus-visible:ring-plum-20 disabled:bg-plum-10",
        EggPlant:
          "text-white bg-EggPlant-20 hover:bg-EggPlant-30 active:bg-EggPlant-20 focus-visible:ring-EggPlant-20 disabled:bg-EggPlant-10",
        yellow:
          "text-white bg-yellow-20 hover:bg-yellow-30 active:bg-yellow-20 focus-visible:ring-yellow-20 disabled:bg-yellow-10",
        magenta:
          "text-white bg-magenta-20 hover:bg-magenta-30 active:bg-magenta-20 focus-visible:ring-magenta-20 disabled:bg-magenta-10",
        midnightBlu:
          "text-white bg-midnight-blue-20 hover:bg-midnight-blue-30 active:bg-midnight-blue-20 focus-visible:ring-midnight-blue-20 disabled:bg-midnight-blue-10",
        cream:
          "text-white bg-cream-20 hover:bg-cream-30 active:bg-cream-20 focus-visible:ring-cream-20 disabled:bg-cream-10",
        coral:
          "text-white bg-coral-20 hover:bg-coral-30 active:bg-coral-20 focus-visible:ring-coral-20 disabled:bg-coral-10",
        lemon:
          "text-white bg-lemon-20 hover:bg-lemon-30 active:bg-lemon-20 focus-visible:ring-lemon-20 disabled:bg-lemon-10",
        purple:
          "text-white bg-purple-20 hover:bg-purple-30 active:bg-purple-20 focus-visible:ring-purple-20 disabled:bg-purple-10",
        violet:
          "text-white bg-violet-20 hover:bg-violet-30 active:bg-violet-20 focus-visible:ring-violet-20 disabled:bg-violet-10",
      },
      size: {
        default: "py-2 px-4 h-10",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
        // Custom sizes
        base: "py-3 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {children}
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
