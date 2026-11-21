"use client";
import Button from "@/components/buttons/button";
import NextImage from "@/components/next-image";
import Typography from "@/components/typography";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-10 w-full max-w-96 bg-white rounded-3xl p-10 shadow-2xl text-center"
          >
            {/* Tombol Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <NextImage
              src="/ba/modal.svg"
              alt="Modal Image"
              width={300}
              height={300}
              className="relative -ml-10 mb-4"
            />
            <Typography
              font="Sora"
              weight="extrabold"
              variant="h6"
              className="mb-4"
            >
              Review Before Submitting
            </Typography>
            <Typography
              font="Sora"
              weight="regular"
              className="text-gray-600 mb-8"
            >
              Please review your answers and uploaded documents carefully before
              submitting. Once submitted, changes cannot be made.
            </Typography>

            <div className="flex gap-4">
              <Button
                onClick={onClose}
                className="flex-1 py-3 border-2 border-blue-600 rounded-xl text-blue-600 hover:bg-blue-100 hover:text-blue-600 font-bold"
              >
                Back
              </Button>
              <Button
                onClick={onSubmit}
                className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-xl text-black hover:text-black font-bold"
              >
                Submit
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
