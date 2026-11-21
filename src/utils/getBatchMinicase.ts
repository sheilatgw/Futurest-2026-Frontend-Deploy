import { FutureTalkBatch } from "@/types/page/futuretalk-batch";

export type BatchStatus = "OPEN" | "COMING_SOON" | "CLOSED";

export function getBatchStatus(batch: FutureTalkBatch): BatchStatus {
  if (!batch.is_active) return "CLOSED";

  const now = new Date();
  const start = new Date(batch.start_date);
  const end = new Date(batch.end_date);
  end.setHours(23, 59, 59, 999);

  if (now < start) return "COMING_SOON";
  if (now > end) return "CLOSED";

  return "OPEN";
}
