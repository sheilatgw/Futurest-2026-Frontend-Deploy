// src/types/aos.d.ts

// Deklarasi untuk modul AOS (JS)
declare module "aos" {
  const AOS: {
    init: (options?: any) => void;
    refresh: () => void;
    // tambah properti lain kalau perlu
  };
  export default AOS;
}

// Deklarasi untuk file CSS (penting!)
declare module "aos/dist/aos.css" {
  const _: any;
  export default _;
}
