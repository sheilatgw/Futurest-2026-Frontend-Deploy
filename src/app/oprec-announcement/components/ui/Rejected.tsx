"use client";

import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Rejected() {
  return (
    <>
      {/* <div className="absolute inset-0 bg-black"></div> */}
      <div className="relative">
        <div className="absolute flex items-center justify-center z-50 ">
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6   max-w-[350px] md:max-w-sm shadow-lg text-center">
            <Typography
              variant="h5"
              weight="semibold"
              className="text-gray-900 pb-2 mb-3 border-b-2 border-green-500 text-[24px]"
            >
              Thank You for Your Time!
            </Typography>
            <Typography
              variant="t"
              weight="light"
              className="text-black leading-relaxed "
            >
              We truly appreciate the effort and enthusiasm you showed in
              applying to <span className="font-medium">Futurest</span>. Keep
              learning and stay in touch for the next opportunity.
            </Typography>
          </div>
        </div>
        <form>
          <Typography
            weight="extrabold"
            font="FiraSans"
            className="text-[#2DA180] mb-8 text-start text-[35px] md:text-[45px] leading-none"
          >
            Check Your Result
          </Typography>
          {/* <div className="absolute inset-0 bg-black"></div> */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold text-gray-700">
              Enter your student ID
            </Label>

            <Input
              type="text"
              placeholder="NRP (e.g. 502621xxxxx)"
              className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm placeholder-gray-400 focus:border-[#2E7D57] focus:ring-[#2E7D57]"
            />

            <p className="text-red-500 text-sm mt-1">anjing</p>
          </div>

          <div className="flex flex-col justify-center items-center pt-6 gap-3">
            <Button
              type="submit"
              variant="success"
              size="lg"
              className="h-8 w-[230px] rounded-xl bg-[#0F936D] text-white hover:bg-[#288456] disabled:opacity-50"
            >
              Check!
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
