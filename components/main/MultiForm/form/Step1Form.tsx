"use client";

import ControlledInput from "@/components/input/ControlledInput";

export default function Step1Form() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <ControlledInput
        name="supplierName"
        label="Supplier Name"
        placeholder="Enter supplier name"
        isRequired
      />
      <ControlledInput
        name="invoiceNumber"
        label="Invoice Number"
        placeholder="Enter invoice number"
        isRequired
      />
      <ControlledInput
        name="invoiceDate"
        label="Invoice Date"
        type="date"
        isRequired
      />
      <ControlledInput
        name="poNumber"
        label="PO Number"
        placeholder="Enter PO number"
        isRequired
      />
    </div>
  );
}
