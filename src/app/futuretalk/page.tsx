"use client";

import useMinicase from "@/hooks/use-minicase"; // Hook POST (Form & Submit)
import { useMinicaseData } from "@/hooks/use-minicase-data"; // Hook GET (Data Fetching)
import useAuthStore from "@/stores/use-auth-store";
import { Suspense, useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

import CompletionPage from "./components/Completion";
import PaymentPage from "./components/Payment";
import RegistrationPage from "./components/Registration";

export default function FutureTalkFlowPage() {
  const { user } = useAuthStore();

  // Ambil info status dari Auth Store
  const participantInfo = user?.minicase_info?.participant_info;
  const isPendingPayment = participantInfo?.status === "PENDING_PAYMENT";
  const savedId = participantInfo?.participant_id;

  // State Step
  const [step, setStep] = useState(0);

  // State ID untuk fetch data (bisa dari localStorage pas baru daftar, ATAU dari AuthStore pas reload)
  const [currentId, setCurrentId] = useState<string | null>(savedId || null);

  // 1. Logic Auto-Redirect: Kalau PENDING_PAYMENT, paksa ke Step 1
  useEffect(() => {
    if (isPendingPayment) {
      setStep(1);
      if (savedId) setCurrentId(savedId);
    }
  }, [isPendingPayment, savedId]);

  // 2. Fetch Data Fresh (buat nampilin harga & unique code di PaymentPage)
  const { data: participantData } = useMinicaseData(currentId);

  // 3. Setup Form Hook
  const minicase = useMinicase(user || undefined, (newId: string) => {
    // Callback pas sukses register baru
    setCurrentId(newId); // Set ID biar hook GET jalan
    setStep(1); // Pindah ke payment
  });

  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FormProvider {...minicase.form}>
        {/* STEP 0: REGISTRATION */}
        {/* Hanya tampilkan Step 0 jika step 0 DAN bukan status Pending Payment */}
        {step === 0 && !isPendingPayment && (
          <RegistrationPage
            isLoading={minicase.isPending}
            onNext={minicase.form.handleSubmit(minicase.onSubmit)}
          />
        )}

        {/* STEP 1: PAYMENT */}
        {/* STEP 1: PAYMENT */}
        {step === 1 && (
          <PaymentPage
            // onBack logic tetap sama
            onBack={
              isPendingPayment
                ? () => {
                    // trigger eslint
                  }
                : () => setStep(0)
            }
            // Data dari hook GET
            data={participantData}
            // UBAH DISINI:
            // 1. Hapus isLoading (PaymentPage punya loading sendiri)
            // 2. Ganti onSubmit jadi onNext
            onNext={() => setStep(2)}
          />
        )}

        {/* STEP 2: COMPLETION */}
        {step === 2 && <CompletionPage />}
      </FormProvider>
    </Suspense>
  );
}
