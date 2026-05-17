"use client";

import dynamic from "next/dynamic";

const MultiForm = dynamic(
  () => import("@/components/main/MultiForm/MultiForm"),
  { ssr: false },
);

export default function page() {
  return <MultiForm />;
}
