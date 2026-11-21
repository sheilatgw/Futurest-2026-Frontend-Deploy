import Button from "@/components/buttons/button";
import { FileUp } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

interface UploadExcelButtonProps {
  onUpload: (data: any[]) => void; // biar hasil Excel bisa dikirim ke parent
}

export function UploadExcelButton({ onUpload }: UploadExcelButtonProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      onUpload(jsonData);
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div {...getRootProps()} className="inline-block">
      <input {...getInputProps()} />
      <Button
        type="button"
        variant="primary"
        className="flex gap-x-4"
        onClick={open}
      >
        <FileUp />
        <span className="text-white">Upload .XLSX</span>
      </Button>
    </div>
  );
}
