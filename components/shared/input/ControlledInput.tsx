"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

type TControlledInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  isRequired?: boolean;
  readOnly?: boolean;
};

export default function ControlledInput({
  name,
  label,
  type = "text",
  placeholder,
  className,
  isRequired = false,
  readOnly = false,
}: TControlledInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1">
          {label && (
            <label className=" font-semibold text-neutral-700 dark:text-neutral-50  text-[0.875rem] leading-[21px]    ">
              {label}
              {isRequired && <span className="ml-1 text-red-500">*</span>}
            </label>
          )}

          <Input
            {...field}
            type={type}
            {...(type === "number" && { min: 0 })}
            placeholder={placeholder}
            value={field.value ?? ""}
            // className={className}

            className={cn(
              "  placeholder:text-neutral-700  dark:placeholder:text-neutral-400 py-2.5 px-3   ",
              "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              "[-moz-appearance:_textfield]",
              ` ${error ? "border border-rose-500" : " border-neutral-700"} `,
              ` ${readOnly && " cursor-not-allowed  "} `,
              className,
            )}
          />

          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
}
