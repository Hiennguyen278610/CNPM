// filepath: src/app/page.tsx
import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}