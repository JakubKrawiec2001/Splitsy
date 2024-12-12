import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  progress?: number;
  goal?: number;
  value?: number;
  className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, progress, ...props }, ref) => {
    const progressValue = progress !== undefined ? progress : value || 0;

    const getBackgroundColor = (value: number) => {
      if (value <= 30) return "bg-red-500";
      if (value > 30 && value <= 70) return "bg-orange-500";
      return "bg-green-500";
    };

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-[#ddd]",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={`h-full w-full flex-1 ${getBackgroundColor(
            progressValue
          )} transition-all`}
          style={{ transform: `translateX(-${100 - progressValue}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
