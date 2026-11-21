import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useExportOprec() {
  const exportToExcel = useMutation({
    mutationFn: async () => {
      const response = await api.get("/api/v1/oprec-staff/export/excel", {
        responseType: "blob",
      });
      return response.data;
    },
    onSuccess: (data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `oprec_data_${new Date().getTime()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Excel file downloaded successfully!");
    },
    onError: (_error) => {
      toast.error("Failed to export Excel file");
    },
  });

  const exportToCSV = useMutation({
    mutationFn: async () => {
      const response = await api.get("/api/v1/oprec-staff/export/csv", {
        responseType: "blob",
      });
      return response.data;
    },
    onSuccess: (data) => {
      const blob = new Blob([data], {
        type: "text/csv",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `oprec_data_${new Date().getTime()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("CSV file downloaded successfully!");
    },
    onError: (_error) => {
      toast.error("Failed to export CSV file");
    },
  });

  return {
    exportToExcel: exportToExcel.mutate,
    exportToCSV: exportToCSV.mutate,
    isExportingExcel: exportToExcel.isPending,
    isExportingCSV: exportToCSV.isPending,
  };
}
