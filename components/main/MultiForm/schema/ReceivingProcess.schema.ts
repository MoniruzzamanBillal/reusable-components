import { z } from "zod";

export const step1Schema = z.object({
  supplierName: z.string().min(1, "Required"),
  invoiceNumber: z.string().min(1, "Required"),
  invoiceDate: z.string().min(1, "Required"),
  poNumber: z.string().min(1, "Required"),
});

export const step2Schema = z.object({
  warehouseLocation: z.string().min(1, "Required"),
  receivingDate: z.string().min(1, "Required"),
  receivedBy: z.string().min(1, "Required"),
  remarks: z.string().optional(),
});

export const step3Schema = z.object({
  materialName: z.string().min(1, "Required"),
  materialCode: z.string().min(1, "Required"),
  materialType: z.string().min(1, "Required"),
  remarks: z.string().optional(),
});

export const fullFormSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export type TFullFormType = z.infer<typeof fullFormSchema>;

export const stepFields: Record<number, (keyof TFullFormType)[]> = {
  0: ["supplierName", "invoiceNumber", "invoiceDate", "poNumber"],
  1: ["warehouseLocation", "receivingDate", "receivedBy", "remarks"],
  2: ["materialName", "materialCode", "materialType", "remarks"],
};
