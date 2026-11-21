"use client";

import useBrandAmbassador from "@/hooks/use-brand-ambassador";
import useAuthStore from "@/stores/use-auth-store";
import { Suspense } from "react";
import { FormProvider } from "react-hook-form";
import RegistrationPage from "./components/Registration";

export default function BrandAmbassadorPage() {
  const user = useAuthStore.useUser();

  const { form, onSubmit, isPending, isSuccess, isError, reset } =
    useBrandAmbassador(user || undefined);
  const handleFinalSubmit = async () => {
    const data = form.getValues();
    onSubmit(data);
  };

  return (
    <Suspense
      fallback={<div className="text-center p-10">Loading form...</div>}
    >
      <FormProvider {...form}>
        <RegistrationPage
          isLoading={isPending}
          isSuccess={isSuccess}
          isError={isError}
          onNext={handleFinalSubmit}
          resetError={reset}
        />
      </FormProvider>
    </Suspense>
  );
}
