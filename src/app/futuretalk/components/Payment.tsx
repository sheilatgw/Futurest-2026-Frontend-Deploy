"use client";

import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { useUploadPaymentProof } from "@/hooks/use-payment-proof"; // Import hook baru
import { MinicaseParticipant } from "@/types/page/regist-minicase";
import { Banknote, Files } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form"; // Import ini
import toast from "react-hot-toast";
import { RiWhatsappFill } from "react-icons/ri";
import UploadFile from "./FileUpload"; // Pastikan path benar
import StepIndicator from "./StepIndicator"; // Pastikan path benar

type Props = {
  onBack: () => void;
  onNext: () => void; // Ganti onSubmit jadi onNext (dipanggil pas sukses upload)
  // isLoading: boolean -> Tidak perlu dari props, kita pakai loading dari hook lokal
  data?: MinicaseParticipant | null;
};

export default function PaymentPage({ onBack, onNext, data }: Props) {
  const totalPrice = data?.total_price || 0;
  const uniqueCode = data?.unique_code || 0;
  const participantId = data?.id;

  // 1. Ambil file dari FormProvider (Parent)
  // Pastikan <UploadFile> menyimpan valuenya ke form dengan nama 'payment_proof'
  const { watch } = useFormContext();

  // Watch value file biar kita bisa validasi
  const paymentProofFile = watch("payment_proof");

  // 2. Panggil Hook Upload
  const { mutate: uploadProof, isPending } = useUploadPaymentProof(() => {
    // Callback kalau sukses: Pindah ke step selanjutnya
    onNext();
  });

  // 3. Fungsi Handle Submit
  const handleUpload = () => {
    if (!participantId) {
      toast.error("Participant ID not found");
      return;
    }

    // Validasi manual: Pastikan file ada
    // Note: paymentProofFile bentuknya bisa File object atau FileList tergantung component UploadFile mu
    // Sesuaikan pengecekan di bawah
    const fileToUpload =
      paymentProofFile instanceof File
        ? paymentProofFile
        : paymentProofFile?.[0];

    if (!fileToUpload) {
      toast.error("Please upload the payment proof first");
      return;
    }

    uploadProof({
      participantId,
      file: fileToUpload,
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="relative w-full h-100 md:h-80">
        <Image
          src="/images/futuretalk/Banner.png"
          alt="Future Energy Summit Banner"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="w-full max-w-2xl mx-auto pt-8 px-4 mb-8">
        <div className="w-full aspect-[3/1] rounded-xl relative flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src="/images/futuretalk/FutureTalkxMinicase.png"
            alt="Banner"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <StepIndicator currentStep={2} />

      <main className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-300">
          <Typography font="Sora" weight="bold" className="text-black mb-4">
            Nominal Amount to be Paid:
          </Typography>

          {/* Tombol Copy Price */}
          <div
            onClick={() => {
              navigator.clipboard.writeText(totalPrice.toString());
              toast.success("Total price copied to clipboard!");
            }}
            className="bg-[#DBAA2C] text-white font-bold py-2 px-6 rounded-2xl inline-block text-xl mb-6 cursor-pointer hover:bg-[#c49626] transition-all active:scale-95"
          >
            <Typography
              font="Sora"
              weight="bold"
              className="text-white flex items-center gap-2 select-none"
            >
              Total: Rp {totalPrice.toLocaleString("id-ID")} <Files size={18} />
            </Typography>
          </div>

          <p>Kode Unik Tim : {uniqueCode}</p>

          <Typography font="Sora" weight="bold" className="text-black mb-4">
            Please make payment using the account number below:
            <div className="flex justify-center">
              <div
                onClick={() => {
                  navigator.clipboard.writeText("5726053070");
                  toast.success("Account number copied to clipboard!");
                }}
                className="bg-[#DBAA2C] text-white font-bold py-2 px-6 rounded-2xl inline-block text-xl mb-6 cursor-pointer hover:bg-[#c49626] transition-all active:scale-95"
              >
                <Typography
                  font="Sora"
                  weight="bold"
                  className="text-white text-center flex items-center gap-2 select-none"
                >
                  5726053070 (BCA) a.n. Chaerine Zahra Komala P
                  <Banknote size={18} />
                </Typography>
              </div>
            </div>
          </Typography>
          <Typography font="Sora" weight="bold" className="text-black mb-4">
            Or scan this QR Code:
          </Typography>

          <div className="bg-white p-4 flex justify-center rounded-xl border border-gray-300">
            <Image
              src={"/images/futuretalk/qris.jpeg"}
              alt="Payment Account"
              width={400}
              height={400}
            />
          </div>

          <div className="mt-6 mb-4">
            <Typography font="Sora" weight="bold" className="text-black">
              Contact Person
            </Typography>
            <div className="space-x-2 mt-2">
              <a
                href="https://wa.me/62895401578860"
                target="_blank"
                className="no-underline"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  className="bg-[#0F936D] mt-2 px-6 gap-2"
                >
                  Ayunda <RiWhatsappFill size={18} />
                </Button>
              </a>
              <a
                href="https://wa.me/628973900016"
                target="_blank"
                className="no-underline"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  className="bg-[#0F936D] mt-2 px-6 gap-2"
                >
                  Billa <RiWhatsappFill size={18} />
                </Button>
              </a>
            </div>
          </div>

          {/* INPUT FILE */}
          {/* PERHATIKAN: name="payment_proof" sesuai request */}
          <UploadFile
            variant="md"
            name="payment_proof"
            title="Payment Proof"
            isRequired
          />
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={onBack}
            // Disable back kalau lagi upload
            disabled={isPending}
            className="flex-1 py-3 px-6 rounded-2xl border-2 border-[#3A6AB2] text-[#3A6AB2] font-bold hover:bg-blue-50 transition-colors"
          >
            Back
          </Button>

          <Button
            onClick={handleUpload} // Panggil fungsi upload lokal
            disabled={isPending}
            className="flex-1 py-3 px-6 rounded-2xl bg-[#3A6AB2] text-white font-bold"
          >
            {isPending ? "Uploading..." : "Confirm Payment"}
          </Button>
        </div>
      </main>
    </div>
  );
}
