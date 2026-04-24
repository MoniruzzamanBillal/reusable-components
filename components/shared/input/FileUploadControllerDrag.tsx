"use client";

import { cn } from "@/lib/utils";
import { FileUp, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const SUPPORTED_FILE_TYPES_Pdf_img = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
];

type TFileUploadControllerProps = {
  name: string;
  className?: string;
  label?: string;
  isRequired?: boolean;
};

export default function FileUploadControllerDrag({
  name,
  className,
  label,
  isRequired = false,
}: TFileUploadControllerProps) {
  const { control } = useFormContext();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => {
        const file: File | null = field.value;

        const isImage = previewUrl?.startsWith("data:image");
        const isPdf = previewUrl?.startsWith("data:application/pdf");

        const processFile = async (file: File) => {
          if (!SUPPORTED_FILE_TYPES_Pdf_img.includes(file.type)) {
            alert("Allowed: PNG, JPG, WEBP, SVG, PDF");
            return;
          }

          // Convert to Base64
          const base64 = await convertToBase64(file);

          setPreviewUrl(base64);
          field.onChange(file);
        };

        const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          await processFile(file);
        };

        const handleDelete = () => {
          setPreviewUrl(null);
          field.onChange(null);
        };

        const handleDragOver = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        };

        const handleDragEnter = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        };

        const handleDragLeave = (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        };

        const handleDrop = async (e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);

          const file = e.dataTransfer.files?.[0];
          if (!file) return;

          await processFile(file);
        };

        return (
          <div>
            {label && (
              <label className=" font-semibold text-neutral-700 dark:text-neutral-50  text-[0.875rem] leading-[21px]    ">
                {label}
                {isRequired && <span className="ml-1 text-red-500">*</span>}
              </label>
            )}

            <div
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                " w-full min-h-[150px] border border-dashed border-neutral-700 rounded-[8px]  flex items-center justify-center relative mt-2 ",
                isDragging
                  ? "border-red-400 bg-red-500/10 "
                  : "border-neutral-700",
                className,
              )}
            >
              {file ? (
                <>
                  {/* DELETE BUTTON */}
                  <button
                    onClick={handleDelete}
                    type="button"
                    className="absolute w-6 h-6 flex items-center justify-center bg-red-50 rounded-full p-1 -right-2 -top-2 z-10 cursor-pointer "
                  >
                    <X className="w-4 h-4 text-red-600 " />
                  </button>

                  {/* IMAGE PREVIEW */}
                  {isImage && (
                    <Image
                      src={previewUrl!}
                      alt="Preview"
                      width={1980}
                      height={1280}
                      className="w-full h-full rounded-lg "
                    />
                  )}

                  {/* PDF PREVIEW */}
                  {isPdf && (
                    <iframe
                      src={previewUrl!}
                      className="w-full h-full rounded-lg"
                    />
                  )}

                  {/* UNKNOWN TYPE */}
                  {!isImage && !isPdf && (
                    <div className="text-center text-gray-600">
                      <p>Unsupported file</p>
                    </div>
                  )}
                </>
              ) : (
                // Upload Placeholder
                <label
                  htmlFor={`${name}-file`}
                  className="cursor-pointer flex flex-col items-center justify-center  text-center  "
                >
                  {/* <Image width={36} height={36} src={uploadSvg} alt="Upload" /> */}

                  <div className=" bg-table-border rounded-full p-2  ">
                    <FileUp className=" text-primary-500 " />
                  </div>

                  <p className=" mt-3 text-[0.875rem] leading-[21px] font-medium text-neutral-600 ">
                    <span className=" text-primary-500 ">Click to Upload</span>{" "}
                    or drag and drop
                  </p>
                  <p className=" mt-1 text-[0.875rem]  font-medium text-neutral-600 ">
                    (Max. File size: 25 MB)
                  </p>

                  <input
                    id={`${name}-file`}
                    type="file"
                    accept=".png,.jpg,.jpeg,.webp,.svg,.pdf"
                    className="hidden"
                    onChange={handleFile}
                  />
                </label>
              )}
            </div>

            {fieldState.error && (
              <p className="text-rose-500 text-xs mt-1 pl-2">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
