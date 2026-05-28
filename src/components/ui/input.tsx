import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type = "text", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition",
        "placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#183972]",
        className
      )}
      {...props}
    />
  );
}
