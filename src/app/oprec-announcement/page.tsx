"use client";

import Button from "@/components/buttons/button";
import Typography from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useOprecAnnounceHook from "@/hooks/use-oprec-announcement";
import Accepted from "./components/ui/Accepted";
import Rejected from "./components/ui/Rejected";

export default function OprecAnnouncement() {
  const { method, onSubmit, isPending, status, nrp, data } =
    useOprecAnnounceHook();

  return (
    <>
      {status === "rejected" && (
        <div className="absolute inset-0 bg-black/20 z-50 pointer-events-none"></div>
      )}
      {status === "pending" && (
        <div className="absolute inset-0 bg-black/20 z-50 pointer-events-none"></div>
      )}
      <div
        className=" relative 
    flex 
    w-full 
    max-w-[350px] 
    md:max-w-[470px]
    flex-col 
    justify-center 
    bg-cover 
    bg-center 
    px-10
    aspect-[4/7]
    bg-[url('/images/login/bg-form.svg')]"
      >
        {status === "rejected" ||
        status === "pending" ||
        status === "interviewed" ? (
          <Rejected />
        ) : status === "accepted" ? (
          <Accepted
            name={data?.data.name}
            division={data?.data.accepted_division}
            nrp={nrp}
            department={data?.data.department}
            dresscode={data?.data.dresscode}
          />
        ) : (
          <form onSubmit={method.handleSubmit(onSubmit)}>
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
                {...method.register("nrp")}
              />
              {method.formState.errors.nrp && (
                <p className="text-red-500 text-sm mt-1">
                  {method.formState.errors.nrp.message}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-center items-center pt-6 gap-3">
              <Button
                type="submit"
                variant="success"
                size="lg"
                disabled={isPending}
                className="h-8 w-[230px] rounded-xl bg-[#0F936D] text-white hover:bg-[#288456] disabled:opacity-50"
              >
                {isPending ? "Checking..." : "Check!"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
