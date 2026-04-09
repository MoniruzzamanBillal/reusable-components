"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type TpageProps = {
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TableSearch({
  searchValue,
  onSearchChange,
}: TpageProps) {
  return (
    <div className=" relative  w-[60%] sc-laptop:w-[320px]   ">
      <Search className="absolute left-3 top-2.5 text-neutral-400 dark:text-neutral-400 size-6 " />
      <input
        type="text"
        placeholder="Search..."
        onChange={onSearchChange}
        value={searchValue}
        className={cn(
          "w-full pl-11 pr-4 py-2.5  border border-neutral-700 dark:border-neutral-700 rounded-[8px] text-neutral-700 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-blue-500 dark:focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 dark:focus:ring-neutral-600 transition-all",
        )}
      />
    </div>
  );
}
