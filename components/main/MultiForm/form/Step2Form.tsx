"use client";

import ControlledInput from "@/components/input/ControlledInput";
import ControlledTextArea from "@/components/input/ControlledTextArea";

export default function Step2Form() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <ControlledInput
        name="warehouseLocation"
        label="Warehouse Location"
        placeholder="Enter warehouse location"
        isRequired
      />
      <ControlledInput
        name="receivingDate"
        label="Receiving Date"
        type="date"
        isRequired
      />
      <ControlledInput
        name="receivedBy"
        label="Received By"
        placeholder="Enter receiver's name"
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
