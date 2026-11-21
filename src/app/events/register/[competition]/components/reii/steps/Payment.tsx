"use client";

import UploadFile from "../../shared/FileUpload";
import Button from "@/components/buttons/button";
import ButtonLink from "@/components/links/button-link";
import Typography from "@/components/typography";
import { useUploadPaymentCompetition } from "@/hooks/use-payment-compe";
import { CompetitionTeam } from "@/types/page/regist-competition";
import { Copy } from "lucide-react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { RiWhatsappFill } from "react-icons/ri";

type Props = {
  onBack: () => void;
  onNext: () => void;
  data?: CompetitionTeam | null;
};

export default function PaymentPage({ onBack, onNext, data }: Props) {
  const totalPrice = data?.total_price || 50000;
  const uniqueCode = data?.unique_code || 0;
  const teamId = data?.id;

  const { watch } = useFormContext();
  const paymentProofFile = watch("leader_payment_proof");

  const { mutate: uploadProof, isPending } = useUploadPaymentCompetition(() => {
    onNext();
  });

  const handleUpload = () => {
    if (!teamId) {
      toast.error("Team ID not found");
      return;
    }

    const fileToUpload =
      paymentProofFile instanceof File
        ? paymentProofFile
        : paymentProofFile?.[0];

    if (!fileToUpload) {
      toast.error("Please upload the payment proof first");
      return;
    }

    uploadProof({
      teamId,
      file: fileToUpload,
    });
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="w-full">
      <div className="bg-gray-50 p-6 md:p-10 rounded-3xl border border-dashed border-gray-300 shadow-sm mb-10 text-center">
        <div className="mb-6 md:mb-8">
          <Typography
            font="Sora"
            weight="bold"
            className="text-base md:text-lg text-gray-900 mb-4"
          >
            Nominal Amount to be Paid:
          </Typography>

          {/* Tombol Copy Price */}
          <div
            onClick={() => {
              navigator.clipboard.writeText(totalPrice.toString());
              toast.success("Total price copied to clipboard!");
            }}
            className="bg-[#3A6AB2] text-white font-bold py-3 px-8 rounded-2xl inline-block text-xl mb-6 cursor-pointer hover:bg-[#c49626] transition-all active:scale-95"
          >
            <Typography
              font="Sora"
              weight="bold"
              className="text-white flex items-center gap-2 select-none"
            >
              Rp {totalPrice.toLocaleString("id-ID")} <Copy size={18} />
            </Typography>
          </div>

          <p className="text-gray-600 mb-6">
            Kode Unik Tim : <strong>{uniqueCode}</strong>
          </p>

          <Typography font="Sora" weight="bold" className="text-gray-900 mb-4">
            Please make payment using the account number below:
          </Typography>

          <div className="space-y-4 md:space-y-6 max-w-xl mx-auto">
            <div
              onClick={() => handleCopy("1440023760157", "Mandiri Number")}
              className="bg-white border border-[#3A6AB2] rounded-xl py-4 px-5 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"
            >
              <Typography
                font="Sora"
                weight="semibold"
                className="text-sm md:text-base text-[#3A6AB2]"
              >
                5726053070 a.n. Chaerine Zahra Komala P - BCA
              </Typography>
              <Copy className="text-[#3A6AB2] shrink-0 ml-2" size={18} />
            </div>
          </div>

          <div className="mt-6 mb-4">
            <Typography
              font="Sora"
              weight="bold"
              className="text-gray-900 mb-4"
            >
              Contact Person
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink
                href="https://wa.me/6282132060411"
                target="_blank"
                size="lg"
                className="bg-[#3454D1] rounded-xl hover:bg-[#2841a3] text-sm md:text-base border-none"
              >
                Albir (+62 821-3206-0411){" "}
                <RiWhatsappFill size={22} className="ml-2" />
              </ButtonLink>
              <ButtonLink
                href="https://wa.me/6281359411106"
                target="_blank"
                size="lg"
                className="bg-[#3454D1] rounded-xl hover:bg-[#2841a3] text-sm md:text-base border-none"
              >
                Afif (+62 813-5941-1106){" "}
                <RiWhatsappFill size={22} className="ml-2" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm mb-10">
        <UploadFile
          variant="md"
          name="leader_payment_proof"
          title="Payment Proof"
          subLabel="Please upload proof of payment clearly"
          isRequired
          supportFiles={[".png", ".jpg", ".pdf"]}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isPending}
          className="flex-1 py-4 px-6 rounded-2xl border-2 border-[#3A6AB2] text-[#3A6AB2] font-bold hover:bg-gray-100 transition-colors"
        >
          Back
        </Button>

        <Button
          onClick={handleUpload}
          disabled={isPending}
          className="flex-1 py-4 px-6 rounded-2xl bg-[#3A6AB2] text-white font-bold hover:bg-[#2f5591]"
        >
          {isPending ? "Uploading..." : "Upload & Continue"}
        </Button>
      </div>
    </div>
  );
}
