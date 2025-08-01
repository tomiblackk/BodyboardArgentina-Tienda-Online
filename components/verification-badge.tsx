import { ShieldCheck } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VerificationBadgeProps {
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
}

export function VerificationBadge({ size = "md", showTooltip = true }: VerificationBadgeProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const Badge = () => (
    <div className="text-cyan-600">
      <ShieldCheck className={sizeClasses[size]} />
    </div>
  )

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Badge />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Vendedor verificado</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return <Badge />
}
