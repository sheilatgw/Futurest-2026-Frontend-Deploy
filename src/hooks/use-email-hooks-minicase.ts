import { db } from "@/lib/firebase"; // Config firebase yang tadi
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useEmailLogs() {
  const [sentLogIds, setSentLogIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil semua log yang ada di collection 'mail_logs'
    // Opsional: Bisa di filter by batch kalo datanya udah ribuan
    const q = query(collection(db, "mail_logs"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ids = new Set<string>();
      snapshot.docs.forEach((doc) => {
        ids.add(doc.id); // Kita pake ID doc sebagai ID peserta
      });
      setSentLogIds(ids);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Return Set biar ngeceknya cepet pake .has(id)
  return { sentLogIds, loading };
}
