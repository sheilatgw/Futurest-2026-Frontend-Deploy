// lib/apiCo.ts
// URL Base udah gak dipake karena kita nembak ke internal API Next.js
export async function apiCoFetch<T>(
  type: string,
  query: string,
): Promise<T | null> {
  try {
    // Kita panggil API Route internal kita sendiri
    const res = await fetch(`/api/general?type=${type}&query=${query}`);
    if (!res.ok) {
      // Jangan throw, return null aja biar handled di hook
      return null;
    }

    return await res.json();
  } catch (_error) {
    return null;
  }
}
