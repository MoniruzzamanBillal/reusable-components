"use client";

import ControlledInput from "@/components/input/ControlledInput";
import ControlledTextArea from "@/components/input/ControlledTextArea";

export default function Step3Form() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <ControlledInput
        name="materialName"
        label="Material Name"
        placeholder="Enter material name"
        isRequired
      />
      <ControlledInput
        name="materialCode"
        label="Material Code"
        placeholder="Enter material code"
        isRequired
      />
      <ControlledInput
        name="materialType"
        label="Material Type"
        placeholder="Enter material type"
        isRequired
      />
      <div className="col-span-2">
        <ControlledTextArea
          name="remarks"
          label="Remarks"
          placeholder="Enter remarks (optional)"
        />
      </div>
    </div>
  );
}
