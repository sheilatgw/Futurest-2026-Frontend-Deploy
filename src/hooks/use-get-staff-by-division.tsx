import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface OprecStaff {
  id: string;
  name: string;
  email: string;
  department: string;
  batch: string;
  student_id: string;
  phone_number: string;
  line_id: string;
  status: string;
  primary_division: string;
  secondary_division: string;
}

export interface PaginationMeta {
  take: number;
  page: number;
  total_data: number;
  total_page: number;
  sort: string;
  sort_by: string;
  filter?: string;
  filter_by?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: OprecStaff[];
  meta: PaginationMeta;
}

interface UseOprecParams {
  primaryId: string;
  secondaryId: string;
  page?: number;
  take?: number;
  filterStatus?: string; // Optional filter
}

export function useOprecStaff(
  { primaryId, page = 1, take = 10, filterStatus }: UseOprecParams = {
    primaryId: "",
    secondaryId: "",
    page: 1,
    take: 10,
  },
) {
  const fetchOprecStaff = async () => {
    const { data } = await api.get<ApiResponse>(
      `/api/v1/oprec-staff?page=${page}&take=${take}&filter_by=primary_division_id&filter=${primaryId}`,
    );

    if (!data.success) throw new Error(data.message);

    let staffData = data.data;

    // Filter by status jika filterStatus diberikan
    if (filterStatus) {
      staffData = staffData.filter(
        (item) => item.status.toLowerCase() === filterStatus.toLowerCase(),
      );
    }

    const withIndex = staffData.map((item, idx) => ({
      ...item,
      index: (page - 1) * take + idx + 1,
    }));

    return {
      data: withIndex,
      meta: data.meta,
    };
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["oprec-staff", primaryId, page, take, filterStatus],
    queryFn: fetchOprecStaff,
    enabled: !!primaryId,
  });

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? {
      take,
      page,
      total_data: 0,
      total_page: 0,
      sort: "asc",
      sort_by: "id",
    },
    isLoading,
    isError,
    error,
    refetch,
  };
}
