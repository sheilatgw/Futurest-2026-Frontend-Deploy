// types/export-types.ts

export interface JudgeScore {
  judgeName: string;
  // Score per kriteria (1-100)
  scores: {
    completeness: number;
    problem: number;
    logic: number;
    impact: number;
    originality: number;
  };
  feedback?: string;
}

export interface TeamData {
  id: string;
  name: string;
  title: string;
  abstract: string;
  judges: JudgeScore[]; // Harus ada 3 juri per tim
}
