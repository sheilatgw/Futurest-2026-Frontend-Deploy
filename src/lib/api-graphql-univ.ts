// Ganti URL ini dengan URL Vercel lu nanti
export const GRAPHQL_BASE_URL = "https://url-project-lu.vercel.app/graphql";

export async function graphqlFetch<T>(
  query: string,
  variables: any = {},
): Promise<T> {
  const res = await fetch(GRAPHQL_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}
