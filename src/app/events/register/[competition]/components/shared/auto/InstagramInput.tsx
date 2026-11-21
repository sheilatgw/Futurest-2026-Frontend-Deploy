"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react"; // 1. Import useState & useEffect
import { useFormContext } from "react-hook-form";

// Interface Props diperluas untuk menerima 'logic'
interface InstagramInputProps {
  logic: any;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function InstagramInput({
  logic,
  label,
  placeholder,
  required,
}: InstagramInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors["instagram_handle"]?.message as
    | string
    | undefined;

  const {
    showConfirmModal,
    isLoading, // Ini loading API
    isVerified,
    avatarUrl,
    handleConfirmCheck,
    setShowConfirmModal,
  } = logic;
  const [isImageReady, setIsImageReady] = useState(false);
  useEffect(() => {
    if (avatarUrl) {
      setIsImageReady(false);
    }
  }, [avatarUrl]);

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <label
        htmlFor="instagram_handle"
        className="font-bold text-gray-700 flex justify-between items-center"
      >
        <span>
          {label} {required && <span className="text-red-500">*</span>}
        </span>
        {isVerified && (
          <span className="text-xs text-green-600 px-2 py-0.5 rounded-full font-medium border border-green-500">
            ✓ Verified
          </span>
        )}
      </label>

      <div className="relative flex items-center gap-3">
        {/* AVATAR PREVIEW */}
        <AnimatePresence>
          {isVerified && avatarUrl && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }} // Tambahkan exit animation biar smooth kalau hilang
              className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border-2 border-green-500 shadow-sm bg-gray-100" // kasih bg-gray-100 biar ga bolong
            >
              {/* 4. SKELETON / LOADING EFFECT */}
              {/* Muncul cuma kalau image belum ready */}
              {!isImageReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
                  {/* Opsional: Icon user samar-samar */}
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* 5. NEXT/IMAGE DENGAN ONLOAD */}
              <Image
                src={avatarUrl}
                alt="IG Avatar"
                fill
                className={`object-cover transition-all duration-500 ease-in-out ${
                  isImageReady ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
                sizes="(max-width: 768px) 100vw"
                onLoad={() => setIsImageReady(true)} // Trigger saat gambar selesai didownload browser
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex-1">
          <input
            {...register("instagram_handle")}
            id="instagram_handle"
            type="text"
            placeholder={placeholder}
            autoComplete="off"
            className={`
              w-full rounded-xl border p-3 focus:outline-none focus:ring-2 transition-all bg-white
              ${errorMessage ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#3A6AB2]"}
              ${isVerified ? "border-green-500 pr-10" : ""} 
            `}
            onKeyDown={(e) => {
              if (e.key === "Enter" && showConfirmModal) {
                e.preventDefault();
                handleConfirmCheck();
              }
            }}
          />

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute right-3 top-3.5">
              <div className="w-5 h-5 border-2 border-[#3A6AB2] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* CONFIRMATION MODAL */}
          <AnimatePresence>
            {showConfirmModal && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 top-[60px] left-0 w-full bg-[#3A6AB2] text-white p-4 rounded-xl shadow-xl border border-blue-700"
              >
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium">
                    Is this username correct? <br />
                    <span className="text-blue-200 text-xs font-normal">
                      We will fetch your public data automatically.
                    </span>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowConfirmModal(false)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      No, let me fix
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmCheck}
                      className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#FFCE1F] text-gray-900 hover:bg-[#e6b91c] shadow-sm"
                    >
                      Yes, Check It!
                    </button>
                  </div>
                </div>
                <div className="absolute -top-2 left-8 w-4 h-4 bg-[#3A6AB2] transform rotate-45 border-l border-t border-blue-700"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-between items-start">
        {errorMessage ? (
          <span className="mt-1 text-sm text-red-600 font-medium animate-pulse [animation-duration:200ms]">
            {errorMessage}
          </span>
        ) : (
          <span className="text-xs text-gray-400">
            {isVerified
              ? "Data auto-filled based on your public profile."
              : "Type username and wait for confirmation..."}
          </span>
        )}
      </div>

      {isVerified && (
        <p className="text-[10px] text-orange-500 mt-1 italic">
          *If the data isn't accurate, please re-type your username above to
          reset.
        </p>
      )}
    </div>
  );
}
