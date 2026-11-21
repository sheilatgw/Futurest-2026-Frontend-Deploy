import { CompetitionBatch } from "@/types/page/regist-competition";

export type BatchStatus = "OPEN" | "COMING_SOON" | "CLOSED";

export function getBatchStatus(batch: CompetitionBatch): BatchStatus {
  if (!batch.is_active) return "CLOSED";

  const now = new Date();
  // const start = new Date(batch.start_date)
  // const end = new Date(batch.end_date)
  // end.setHours(23, 59, 59, 999)

  // new Date("YYYY-MM-DD") is parsed as UTC midnight, so we build the timestamp manually.
  const [startYear, startMonth, startDay] = batch.start_date
    .split("-")
    .map(Number);
  const [endYear, endMonth, endDay] = batch.end_date.split("-").map(Number);
  // Start of start_date at 00:00:00 WIB = UTC-7h
  const start = new Date(
    Date.UTC(startYear, startMonth - 1, startDay) - 7 * 60 * 60 * 1000,
  );
  // End of end_date at 23:59:59.999 WIB = UTC-7h+24h-1ms
  const end = new Date(
    Date.UTC(endYear, endMonth - 1, endDay + 1) - 7 * 60 * 60 * 1000 - 1,
  );

  if (now < start) return "COMING_SOON";
  if (now > end) return "CLOSED";

  return "OPEN";
}
