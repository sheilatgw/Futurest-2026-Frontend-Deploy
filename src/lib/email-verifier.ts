// Helper untuk cek bounce (bisa ditaruh di luar hook atau file utils terpisah)
export const verifyEmailDelivery = async (targetEmail: string) => {
  // Tunggu 4 detik simulasi delay server email
  await new Promise((resolve) => setTimeout(resolve, 4000));

  try {
    const res = await fetch("/api/admin/check-bounces", { method: "POST" });
    const data = await res.json();

    if (data.bounced_emails && Array.isArray(data.bounced_emails)) {
      const isBounced = data.bounced_emails.includes(targetEmail);
      return isBounced ? "BOUNCED" : "DELIVERED";
    }
    return "DELIVERED";
  } catch (e) {
    console.error("Gagal cek bounce:", e);
    return "UNKNOWN"; // Anggap delivered aja kalau error checker
  }
};
