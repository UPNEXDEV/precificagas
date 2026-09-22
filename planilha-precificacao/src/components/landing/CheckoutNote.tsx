import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

export function CheckoutNote({ className }: { className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-1.5 text-[13px] text-neutral-500", className)}>
      <Lock className="size-3.5" aria-hidden="true" />
      Compra processada com segurança pela Kiwify
    </p>
  )
}
