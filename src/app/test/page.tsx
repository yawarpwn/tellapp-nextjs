import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
export default function Page() {
  return (
    <div>
      <span>
        <TooltipProvider>
          <Tooltip defaultOpen open={true}>
            <TooltipTrigger>tete</TooltipTrigger>
            <TooltipContent>
              <p>mees</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </div>
  )
}
