import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { TypeOprecStaffResponse } from "@/types/page/oprec-staff-response";

export type DetailResponse = ApiResponse<TypeOprecStaffResponse>;

export default function useGetDetailRegistrant(user_id: string) {
  const { data: detailData, isLoading } = useQuery<DetailResponse>({
    queryKey: ["detail-registrant", user_id],
    queryFn: async () => {
      const { data } = await api.get<DetailResponse>(
        "/api/v1/oprec-staff/" + user_id,
      );

      return data;
    },
    refetchOnWindowFocus: true,
  });

  return { detailData, isLoading };
}
