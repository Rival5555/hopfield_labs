import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--border)]",
        mono:
          "font-mono uppercase tracking-[0.12em] text-[11px] bg-[var(--surface-2)] text-[var(--fg-muted)] border border-[var(--border)]",
        accent:
          "bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20",
        signal:
          "bg-[var(--signal)]/10 text-[var(--signal)] border border-[var(--signal)]/20 font-mono",
        outline:
          "border border-[var(--border)] text-[var(--fg-muted)] bg-transparent",
        danger:
          "bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: "signal" | "accent" | "danger";
  pulse?: boolean;
}

function Badge({
  className,
  variant,
  dot = false,
  dotColor = "signal",
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const dotColorClass = {
    signal: "bg-[var(--signal)]",
    accent: "bg-[var(--accent)]",
    danger: "bg-[var(--danger)]",
  }[dotColor];

  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className="relative flex h-2 w-2 mr-1.5">
          {pulse && (
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                dotColorClass
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              dotColorClass
            )}
          />
        </span>
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
