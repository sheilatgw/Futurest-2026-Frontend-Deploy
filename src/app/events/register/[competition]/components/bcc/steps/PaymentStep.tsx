"use client";

import { Copy, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import FileUpload from "../../shared/FileUpload";

interface CopyButtonProps {
  text: string;
  label: string;
  className?: string;
  variant?: "primary" | "outline";
}

const CopyButton = ({
  text,
  label,
  className,
  variant = "primary",
}: CopyButtonProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`
        flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all
        ${
          variant === "primary"
            ? "bg-[#3A6AB2] text-white hover:bg-[#2c528a]"
            : "border-2 border-[#3A6AB2] text-[#3A6AB2] bg-white hover:bg-blue-50"
        }
        ${className}
      `}
    >
      {label}
      <Copy size={18} />
    </button>
  );
};

interface ContactButtonProps {
  number: string;
  name: string;
}

const ContactButton = ({ number, name }: ContactButtonProps) => {
  const whatsappUrl = `https://wa.me/${number.replace(/\D/g, "")}`;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-[#0F936D] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#0b7054] transition-all flex-1 justify-center"
    >
      {number} ({name})
      <MessageCircle size={20} fill="currentColor" />
    </a>
  );
};

export default function PaymentStep() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-sora">
      {/* INSTRUCTIONS CARD */}
      <div className="bg-[#F3F4F6] p-8 md:p-12 rounded-[40px] shadow-sm flex flex-col items-center text-center">
        <h3 className="text-gray-900 font-bold text-lg mb-4">
          Nominal Amount to be Paid :
        </h3>
        <CopyButton text="170000" label="Rp170.000" className="mb-8" />

        <p className="text-gray-900 font-bold mb-4">
          Please make payment using the account number below:
        </p>
        <CopyButton
          text="5726053070"
          label="5726053070 (BCA) Chaerine Zahra"
          variant="outline"
          className="mb-10 w-full max-w-2xl justify-center"
        />

        <h3 className="text-gray-900 font-bold text-lg mb-4">Contact Person</h3>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <ContactButton number="+62 895-6139-04300" name="Rizal" />
          <ContactButton number="+62 888-0388-4481" name="Wedha" />
        </div>
      </div>

      {/* PROOF UPLOAD CARD */}
      <div className="bg-[#F3F4F6] p-8 md:p-12 rounded-[40px] shadow-sm">
        <FileUpload
          name="payment_proof"
          title={
            <span className="text-gray-700 font-bold text-lg">
              Payment Proof<span className="text-red-500">*</span>
            </span>
          }
          description="Please upload proof of payment clearly"
          variant="lg"
          isRequired={false}
          supportFiles={[".png", ".jpg", ".pdf"]}
        />
      </div>
    </div>
  );
}
