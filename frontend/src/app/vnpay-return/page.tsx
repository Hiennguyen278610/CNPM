import { Suspense } from "react";
import VnPayReturnContent from "./VnPayReturnContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <VnPayReturnContent />
    </Suspense>
  );
}