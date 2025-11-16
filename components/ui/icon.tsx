import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: any; // Hugeicons icon object
  size?: number | string;
}

/**
 * Unified icon wrapper for Hugeicons
 *
 * Usage:
 * ```tsx
 * import { Icon } from "@/components/ui/icon"
 * import { Notification03Icon } from "@hugeicons/core-free-icons"
 *
 * <Icon icon={Notification03Icon} className="text-green-600" size={24} />
 * ```
 */
export function Icon({ icon, size = 24, className, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      className={cn("inline-block", className)}
      width={size}
      height={size}
      {...props}
    />
  );
}
