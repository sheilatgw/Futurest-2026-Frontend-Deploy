import api from "@/lib/api";
import { EventDetailDataWrapper } from "@/types/page/event-detail-data";
import { useQuery } from "@tanstack/react-query";

export type EventDetailResponse = EventDetailDataWrapper;

export default function useGetEventDetail(id: string) {
  const {
    data: eventData,
    isLoading,
    isError,
  } = useQuery<EventDetailResponse>({
    queryKey: ["event-detail", id],
    queryFn: async () => {
      const { data: eventData } = await api.get<EventDetailResponse>(
        `https://dev-api.futurest.id/api/v1/minicase/participants/` + id,
      );

      return eventData;
    },
    enabled: !!id,
  });

  return { eventData, isLoading, isError };
}
