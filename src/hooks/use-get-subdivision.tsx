import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface SubDivision {
  id: string;
  name: string;
  division_id: string;
  question_1: string | null;
  question_2: string | null;
  question_3: string | null;
  question_4: string | null;
  question_5: string | null;
  question_6: string | null;
  study_case_question_1: string | null;
  study_case_question_2: string | null;
  study_case_question_3: string | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: SubDivision;
}

export function useSubDivision(primaryId: string) {
  const fetchSubDivision = async (): Promise<SubDivision> => {
    const { data } = await api.get<ApiResponse>(
      `/api/v1/master/division/sub/${primaryId}`,
    );

    if (!data.success) throw new Error(data.message);
    return data.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["sub-division", primaryId],
    queryFn: fetchSubDivision,
    enabled: !!primaryId,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
