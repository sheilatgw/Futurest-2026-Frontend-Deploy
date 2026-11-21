import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; // atau 'react-hot-toast'
import * as XLSX from "xlsx";

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
  accepted_division?: string;
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

interface DownloadParams {
  meta: PaginationMeta;
  primaryId: string;
  filterStatus?: string;
}

const downloadAllStaff = async ({
  meta,
  primaryId,
  filterStatus,
}: DownloadParams) => {
  const { data } = await api.get<ApiResponse>(
    `/api/v1/oprec-staff?page=1&take=${meta.total_data}&filter_by=secondary_division_id&filter=${primaryId}`,
  );

  if (!data.success) {
    throw new Error(data.message);
  }

  let allData = data.data;
  if (filterStatus) {
    allData = allData.filter(
      (item) => item.status.toLowerCase() === filterStatus.toLowerCase(),
    );
  }

  if (allData.length === 0) {
    throw new Error("Tidak ada data untuk di-download (setelah filter).");
  }

  const mappedData = allData.map((user) => ({
    ID: user.id,
    Name: user.name,
    Status: user.status,
    Division: user.accepted_division || "N/A",
  }));

  const ws = XLSX.utils.json_to_sheet(mappedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Oprec Staff");
  XLSX.writeFile(wb, "Oprec_Staff_Export.xlsx");

  return `Berhasil mengunduh ${allData.length} data.`;
};

export function useDownloadOprecStaff() {
  const { mutate, isPending } = useMutation({
    mutationFn: downloadAllStaff,

    onMutate: () => {
      return toast.loading("📥 Mempersiapkan file download...");
    },
    onSuccess: (successMessage, _variables, context) => {
      toast.success(`✅ ${successMessage}`, { id: context });
    },
    onError: (error, _variables, context) => {
      toast.error(`❌ Gagal: ${error.message}`, { id: context });
    },
  });

  return {
    downloadData: mutate,
    isDownloading: isPending,
  };
}
