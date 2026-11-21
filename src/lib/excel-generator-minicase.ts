import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export interface TeamDataExport {
  id: string;
  name: string;
  title: string;
  abstract: string;
}

// Tambah parameter onProgress (optional)
export const generateMinicaseScoreSheet = async (
  teams: TeamDataExport[],
  onProgress?: (percent: number) => void,
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Scoring Sheet");

  // Helper biar UI sempet nafas (render progress bar)
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  // --- 1. SETUP AWAL (Progress 0-10%) ---
  if (onProgress) onProgress(5);
  await sleep(100); // Fake delay dikit biar kerasa "loading"

  worksheet.columns = [
    { header: "", key: "no", width: 5 },
    { header: "", key: "criteria", width: 25 },
    { header: "", key: "indicator", width: 45 },
    { header: "", key: "weight", width: 12 },
  ];

  const JUDGES = ["Juri 1 (Charissa)", "Juri 2 (George)", "Juri 3 (Rifqi)"];

  const criteriaData = [
    {
      id: "completeness",
      title: "Completeness of Abstract Structure",
      desc1:
        "Abstrak memuat elemen utama (latar belakang singkat, pernyataan masalah, tujuan, dan gambaran solusi) secara lengkap dalam format yang ringkas.",
      desc2:
        "Ide utama tersampaikan dengan jelas tanpa kehilangan konteks meskipun dalam batasan panjang abstrak.",
      weight: 0.2,
    },
    {
      id: "problem",
      title: "Focus Problem Statement",
      desc1:
        "Masalah dirumuskan secara spesifik, tidak ambigu, dan langsung menunjukkan isu inti yang ingin diselesaikan.",
      desc2:
        "Urgensi masalah dijelaskan secara singkat tetapi kuat melalui data, fakta umum, atau konteks yang relevan.",
      weight: 0.25,
    },
    {
      id: "logic",
      title: "Flow Logic and Coherence",
      desc1:
        "Alur pemikiran tersusun runtut dari latar belakang → masalah → tujuan → pendekatan/solusi awal.",
      desc2:
        "Keterkaitan antarbagian logis dan konsisten tanpa lompatan ide atau kontradiksi.",
      weight: 0.2,
    },
    {
      id: "impact",
      title: "Potential Impact & Contribution",
      desc1:
        "Abstrak menggambarkan potensi, dampak, dan solusi terhadap isu energi (teknologi, sosial, atau ekonomi) secara jelas.",
      desc2:
        "Kontribusi ide terlihat unik atau memiliki nilai tambah dibanding pendekatan konvensional.",
      weight: 0.2,
    },
    {
      id: "originality",
      title: "Originality and Creativity",
      desc1:
        "Ide menunjukkan unsur kebaruan, tidak sekadar mengulang solusi yang sudah umum.",
      desc2:
        "Pendekatan solusi ditunjukkan melalui sudut pandang kreatif atau metode yang tidak generik.",
      weight: 0.15,
    },
  ];

  // --- RENDER HEADER STATIS ---
  worksheet.mergeCells("A1:D1");
  const titleCell = worksheet.getCell("A1");
  titleCell.value = "Scoring Sheet Abstrak MINICASE 2026";
  titleCell.font = { bold: true, size: 14 };
  titleCell.alignment = { vertical: "middle", horizontal: "left" };

  worksheet.mergeCells("A2:D2");
  worksheet.getCell("A2").value =
    "Penilaian dilakukan dengan cara memberikan nilai berupa angka dengan skala 1-100";
  worksheet.getCell("A2").font = { italic: true, size: 10 };

  const headerLabels = [
    { row: 3, label: "NAMA TIM" },
    { row: 5, label: "JUDUL KARYA" },
    { row: 6, label: "ABSTRAK" },
  ];

  headerLabels.forEach(({ row, label }) => {
    worksheet.mergeCells(`A${row}:D${row}`);
    const cell = worksheet.getCell(`A${row}`);
    cell.value = label;
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFEEEEEE" },
    };
    cell.alignment = { vertical: "middle", horizontal: "left" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  ["No", "Kriteria Penilaian", "Indikator Penilaian", "Subtotal Bobot"].forEach(
    (val, idx) => {
      const cell = worksheet.getCell(8, idx + 1);
      cell.value = val;
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFCCCCCC" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    },
  );

  const criteriaRowsMap: number[] = [];
  let currentRow = 9;

  criteriaData.forEach((c, index) => {
    const rowMain = worksheet.getRow(currentRow);
    rowMain.getCell(1).value = index + 1;
    rowMain.getCell(2).value = c.title;
    rowMain.getCell(3).value = c.desc1;
    rowMain.getCell(4).value = c.weight;

    rowMain.getCell(1).alignment = { vertical: "top", horizontal: "center" };
    rowMain.getCell(2).font = { bold: true };
    rowMain.getCell(2).alignment = { vertical: "top", wrapText: true };
    rowMain.getCell(3).alignment = { wrapText: true, vertical: "top" };
    rowMain.getCell(4).alignment = { vertical: "top", horizontal: "center" };

    criteriaRowsMap.push(currentRow);

    const rowDesc = worksheet.getRow(currentRow + 1);
    rowDesc.getCell(3).value = c.desc2;
    rowDesc.getCell(3).alignment = { wrapText: true, vertical: "top" };

    worksheet.mergeCells(`A${currentRow}:A${currentRow + 1}`);
    worksheet.mergeCells(`B${currentRow}:B${currentRow + 1}`);
    worksheet.mergeCells(`D${currentRow}:D${currentRow + 1}`);

    currentRow += 2;
  });

  const subTotalRow = currentRow;
  worksheet.getCell(`C${subTotalRow}`).value = "SUBTOTAL SKOR";
  worksheet.getCell(`C${subTotalRow}`).font = { bold: true };
  worksheet.getCell(`C${subTotalRow}`).alignment = { horizontal: "right" };
  worksheet.getCell(`D${subTotalRow}`).value = 1.0;
  worksheet.getCell(`D${subTotalRow}`).font = { bold: true };
  worksheet.getCell(`D${subTotalRow}`).alignment = { horizontal: "center" };

  const totalFinalRow = subTotalRow + 1;
  worksheet.getCell(`C${totalFinalRow}`).value = "TOTAL SKOR FINAL";
  worksheet.getCell(`C${totalFinalRow}`).font = { bold: true, size: 12 };
  worksheet.getCell(`C${totalFinalRow}`).alignment = { horizontal: "right" };

  const feedbackRow = totalFinalRow + 2;
  worksheet.getCell(`A${feedbackRow}`).value = "FEEDBACK DARI JURI KE PESERTA";
  worksheet.getCell(`A${feedbackRow}`).font = { bold: true };

  // --- 2. LOOPING TEAM (Progress 10% - 90%) ---
  // Pake for...of biar bisa await
  let processed = 0;
  for (let tIndex = 0; tIndex < teams.length; tIndex++) {
    const team = teams[tIndex];
    const startCol = 5 + tIndex * 6;
    const endCol = startCol + 5;

    const getColLetter = (colNumber: number) => {
      const dividend = colNumber;
      let columnName = "";
      let modulo;
      let n = dividend;
      while (n > 0) {
        modulo = (n - 1) % 26;
        columnName = String.fromCharCode(65 + modulo) + columnName;
        n = Math.floor((n - modulo) / 26);
      }
      return columnName;
    };

    const mergeName = `${getColLetter(startCol)}3:${getColLetter(endCol)}3`;
    worksheet.mergeCells(mergeName);
    const nameCell = worksheet.getCell(mergeName.split(":")[0]);
    nameCell.value = team.name;
    nameCell.font = { bold: true, size: 12 };
    nameCell.alignment = { horizontal: "center", vertical: "middle" };
    nameCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFF00" },
    };

    const mergeTitle = `${getColLetter(startCol)}5:${getColLetter(endCol)}5`;
    worksheet.mergeCells(mergeTitle);
    const titleCell = worksheet.getCell(mergeTitle.split(":")[0]);
    titleCell.value = team.title;
    titleCell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };

    const mergeAbstract = `${getColLetter(startCol)}6:${getColLetter(endCol)}6`;
    worksheet.mergeCells(mergeAbstract);
    const abstractCell = worksheet.getCell(mergeAbstract.split(":")[0]);
    abstractCell.value = team.abstract;
    abstractCell.alignment = { vertical: "top", wrapText: true };
    const abstractLength = team.abstract ? team.abstract.length : 0;
    worksheet.getRow(6).height = Math.max(
      100,
      Math.ceil(abstractLength / 100) * 15,
    );

    const teamFinalScoreCells: string[] = [];

    JUDGES.forEach((judgeName, jIndex) => {
      const colNilaiIdx = startCol + jIndex * 2;
      const colHasilIdx = colNilaiIdx + 1;
      const colNilai = getColLetter(colNilaiIdx);
      const colHasil = getColLetter(colHasilIdx);

      worksheet.mergeCells(`${colNilai}7:${colHasil}7`);
      const judgeHeader = worksheet.getCell(`${colNilai}7`);
      judgeHeader.value = judgeName;
      judgeHeader.font = { bold: true };
      judgeHeader.alignment = { horizontal: "center" };
      judgeHeader.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9E1F2" },
      };

      const hNilai = worksheet.getCell(`${colNilai}8`);
      hNilai.value = "Nilai";
      hNilai.alignment = { horizontal: "center" };
      hNilai.border = { bottom: { style: "medium" } };

      const hHasil = worksheet.getCell(`${colHasil}8`);
      hHasil.value = "Hasil";
      hHasil.alignment = { horizontal: "center" };
      hHasil.border = { bottom: { style: "medium" } };

      criteriaRowsMap.forEach((rowNum) => {
        const cNilai = worksheet.getCell(`${colNilai}${rowNum}`);
        cNilai.value = null;
        cNilai.alignment = { horizontal: "center" };
        cNilai.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFFFF" },
        };

        const cHasil = worksheet.getCell(`${colHasil}${rowNum}`);
        cHasil.value = {
          formula: `IF(${colNilai}${rowNum}="",0, ${colNilai}${rowNum}*$D${rowNum})`,
        };
        cHasil.numFmt = "0.00";
        cHasil.font = { color: { argb: "FF888888" } };
      });

      const cSubTotal = worksheet.getCell(`${colHasil}${subTotalRow}`);
      const cellsToSum = criteriaRowsMap
        .map((r) => `${colHasil}${r}`)
        .join(",");
      cSubTotal.value = { formula: `SUM(${cellsToSum})` };
      cSubTotal.font = { bold: true };
      cSubTotal.numFmt = "0.00";
      cSubTotal.border = { top: { style: "medium" } };

      teamFinalScoreCells.push(`${colHasil}${subTotalRow}`);
    });

    const mergeFinal = `${getColLetter(startCol)}${totalFinalRow}:${getColLetter(
      endCol,
    )}${totalFinalRow}`;
    worksheet.mergeCells(mergeFinal);
    const cFinal = worksheet.getCell(mergeFinal.split(":")[0]);
    cFinal.value = { formula: `AVERAGE(${teamFinalScoreCells.join(",")})` };
    cFinal.font = { bold: true, size: 14, color: { argb: "FFFF0000" } };
    cFinal.alignment = { horizontal: "center", vertical: "middle" };
    cFinal.numFmt = "0.00";

    const mergeFeedback = `${getColLetter(startCol)}${feedbackRow}:${getColLetter(
      endCol,
    )}${feedbackRow}`;
    worksheet.mergeCells(mergeFeedback);
    const cFeedback = worksheet.getCell(mergeFeedback.split(":")[0]);
    cFeedback.value = null;
    cFeedback.alignment = { vertical: "top", wrapText: true };
    worksheet.getRow(feedbackRow).height = 80;

    for (let r = 7; r <= feedbackRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const cell = worksheet.getCell(r, c);
        if (!cell.border) {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        } else {
          cell.border = {
            ...cell.border,
            left: cell.border.left || { style: "thin" },
            right: cell.border.right || { style: "thin" },
            top: cell.border.top || { style: "thin" },
            bottom: cell.border.bottom || { style: "thin" },
          };
        }
      }
    }
    for (let r = 3; r <= feedbackRow; r++) {
      worksheet.getCell(r, startCol).border = {
        ...worksheet.getCell(r, startCol).border,
        left: { style: "medium" },
      };
    }
    for (let r = 3; r <= feedbackRow; r++) {
      worksheet.getCell(r, endCol).border = {
        ...worksheet.getCell(r, endCol).border,
        right: { style: "medium" },
      };
    }

    // UPDATE PROGRESS
    processed++;
    if (onProgress) {
      // 10% (awal) + (80% * progress loop)
      const percentage = 10 + Math.floor((processed / teams.length) * 80);
      onProgress(percentage);
      await sleep(10); // Sleep dikit tiap loop biar UI update
    }
  }

  // --- 3. WRITING FILE (Progress 90% - 100%) ---
  if (onProgress) onProgress(95); // Finalizing
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (onProgress) onProgress(100);
  await sleep(500); // Tahan bentar di 100 biar user seneng liatnya full

  saveAs(blob, `Scoring_Sheet_Minicase_2026_Input_Template.xlsx`);
};
