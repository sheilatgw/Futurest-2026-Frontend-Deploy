import { checkInstagramProfile } from "@/lib/rapid-api";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

export function useInstagramCheck() {
  const { watch, setValue } = useFormContext();
  const username = watch("instagram_handle");
  const storedAvatar = watch("avatar_url_temp");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const verifiedUsernameRef = useRef<string | null>(null);

  // 1. LOGIC HYDRATION
  useEffect(() => {
    if (storedAvatar && username && !isVerified) {
      setIsVerified(true);
      setAvatarUrl(storedAvatar);
      verifiedUsernameRef.current = username;
    }
  }, [storedAvatar, username, isVerified]);

  // 2. LOGIC TYPING (Debounce)
  useEffect(() => {
    if (!username) {
      setShowConfirmModal(false);
      setIsVerified(false);
      setAvatarUrl(null);
      setValue("avatar_url_temp", undefined);
      verifiedUsernameRef.current = null;
      return;
    }

    if (typingTimer.current) clearTimeout(typingTimer.current);

    typingTimer.current = setTimeout(() => {
      // Kalau username sama dengan yang barusan diverifikasi, jangan ganggu
      if (verifiedUsernameRef.current === username) {
        return;
      }

      // Kalau user ngetik baru, reset status verified biar dia confirm lagi
      if (username.length > 2) {
        setIsVerified(false);
        setAvatarUrl(null);
        setValue("follower_count", "");
        setValue("instagram_public", undefined);
        setValue("avatar_url_temp", undefined);

        setShowConfirmModal(true);
      }
    }, 1000);

    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // 3. LOGIC CONFIRM (Safe Mode)
  const handleConfirmCheck = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    try {
      const data = await checkInstagramProfile(username);

      // --- SAFEGUARD: Handling tanpa Throw Error ---
      // Cek apakah data kosong? Jika ya, kasih toast & stop.
      if (!data || !data.result) {
        toast.error("Account not found. Please type manually.");

        // Pastikan state di-reset biar user bisa input manual
        setIsVerified(false);
        verifiedUsernameRef.current = null;

        return; // RETURN AMAN: Stop eksekusi di sini.
      }

      // --- Kalau sampai sini berarti data ada ---
      const result = data.result;

      // Ambil follower (fallback ke 0 kalau undefined)
      const followerCount = result.edge_followed_by?.count || 0;
      setValue("follower_count", followerCount, { shouldValidate: true });

      // Ambil status private
      const isPublicStr = result.is_private ? "false" : "true";
      setValue("instagram_public", isPublicStr, { shouldValidate: true });

      // Simpan Avatar
      setValue("avatar_url_temp", result.profile_pic_url);
      setAvatarUrl(result.profile_pic_url);

      // Set Sukses
      setIsVerified(true);
      verifiedUsernameRef.current = username;

      toast.success("Instagram profile verified!");
    } catch (_error) {
      // --- Handling Error Koneksi / API Crash ---

      // Jangan bikin aplikasi crash, cukup kasih pesan error
      toast.error(
        "Cannot check Instagram automatically. Please fill manually.",
      );

      setIsVerified(false);
      verifiedUsernameRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    showConfirmModal,
    isLoading,
    isVerified,
    avatarUrl,
    setShowConfirmModal,
    handleConfirmCheck,
  };
}
