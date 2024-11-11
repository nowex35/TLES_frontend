"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/components/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// refSelectionで定義された選択肢
const refSelection = [
  "前回のTL!で知った",
  "家族・友人の紹介",
  "選手の知人",
  "クリエイターからの紹介",
  "メディアの記事",
  "ポスター",
  "チラシ",
  "コズミくん",
  "X",
  "Instagram",
  "LINE",
  "チームSNS",
  "カウントダウンボード",
  "三角ポップ",
  "横断幕",
  "チームSNS",
]

export function Combobox({ onSelect }: { onSelect: (value: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between m-2"
        >
          {value || "Select option..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {refSelection.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    onSelect(currentValue); // 選択された値を親コンポーネントに渡す
                  }}
                >
                  {option}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}