import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export interface REIIDataExport {
  id: string;
  team_name: string;
  university: string;
  leader_name: string;
  member_1?: string;
  member_2?: string;
}

export const generateREIIScoreSheet = async (
  teams: REIIDataExport[],
  onProgress?: (percent: number) => void,
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("REII Scoring Sheet");

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  if (onProgress) onProgress(5);
  await sleep(100);

  // setup kolom: No, Nama Tim, Univ, Leader, Mem 1, Mem 2
  worksheet.columns = [
    { header: "No", key: "no", width: 5 },
    { header: "Nama Tim", key: "team_name", width: 25 },
    { header: "Universitas", key: "university", width: 25 },
    { header: "Ketua", key: "leader", width: 20 },
    { header: "Anggota 1", key: "m1", width: 20 },
    { header: "Anggota 2", key: "m2", width: 20 },
    { header: "Nilai Juri", key: "score", width: 15 },
  ];

  // stylng header
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: "center" };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFEEEEEE" },
  };

  // isi data tim
  let processed = 0;
  teams.forEach((team, index) => {
    worksheet.addRow({
      no: index + 1,
      team_name: team.team_name,
      university: team.university,
      leader: team.leader_name,
      m1: team.member_1 || "-",
      m2: team.member_2 || "-",
      score: "",
    });

    processed++;
    if (onProgress) {
      const percentage = 10 + Math.floor((processed / teams.length) * 85);
      onProgress(percentage);
    }
  });

  if (onProgress) onProgress(95);
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (onProgress) onProgress(100);
  saveAs(blob, `Scoring_Sheet_REII_2026.xlsx`);
};
