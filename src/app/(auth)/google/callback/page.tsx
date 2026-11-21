import { Suspense } from "react";
import GoogleCallbackClient from "./components/GoogleCallback";

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <GoogleCallbackClient />
    </Suspense>
  );
}
