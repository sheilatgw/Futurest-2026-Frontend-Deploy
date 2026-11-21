// lib/rapid-api.ts
export const RAPID_API_KEY = process.env.NEXT_PUBLIC_API_SOCIAL_MEDIA_API || "";
export const RAPID_API_HOST = "instagram120.p.rapidapi.com";

interface InstagramProfileResponse {
  result: {
    id: string;
    username: string;
    full_name: string;
    is_private: boolean;
    profile_pic_url: string; // Avatar (Low Res - cukup buat icon)
    profile_pic_url_hd: string;
    edge_followed_by: {
      count: number; // Jumlah Follower
    };
  };
}

export async function checkInstagramProfile(username: string) {
  const response = await fetch(
    `https://${RAPID_API_HOST}/api/instagram/profile`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": RAPID_API_HOST,
      },
      body: JSON.stringify({ username }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch instagram profile");
  }

  const data = await response.json();
  return data as InstagramProfileResponse;
}
