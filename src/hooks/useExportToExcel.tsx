import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface ExportExcelOptions {
  fileName?: string;
}

export function useExportExcel() {
  const exportExcel = async (variables: {
    url: string;
    options?: ExportExcelOptions;
  }) => {
    const { url, options } = variables;

    const response = await api.get(url, {
      responseType: "blob", // penting biar dapat binary
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = options?.fileName ?? "export.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(link.href);
  };

  const {
    mutate: downloadExcel,
    isPending,
    isError,
    error,
  } = useMutation<void, unknown, { url: string; options?: ExportExcelOptions }>(
    {
      mutationFn: exportExcel,
    },
  );

  return { downloadExcel, isPending, isError, error };
}
