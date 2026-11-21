import Typography from "@/components/typography";
const fontVariants = ["FiraSans", "Sora", "Titillium", "Pagkaki"] as const;
const fontWeights = [
  "regular",
  "medium",
  "semibold",
  "bold",
  "extrabold",
] as const;

const typographyVariants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "t",
  "p",
  "bt",
  "l",
] as const;

export default function TypographyPage() {
  return (
    <section className="my-8 px-4 text-center">
      <table className="mt-8 min-w-full border-collapse overflow-auto border border-[#E0E0E0]">
        <thead>
          <tr>
            <th className="border bg-[#F5F5F5] px-4 py-2">Font Variant</th>
            <th className="border bg-[#F5F5F5] px-4 py-2">Font Weight</th>
            <th className="border bg-[#F5F5F5] px-4 py-2">
              Typography Variant
            </th>
            <th className="border bg-[#F5F5F5] px-4 py-2">Sample</th>
          </tr>
        </thead>
        <tbody>
          {fontVariants.map((fontVariant) =>
            fontWeights.map((fontWeight) =>
              typographyVariants.map((typographyVariant) => (
                <tr key={`${fontVariant}-${fontWeight}-${typographyVariant}`}>
                  <td className="border border-gray-300 px-4 py-2">
                    {fontVariant}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {fontWeight}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {typographyVariant}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Typography
                      as="p"
                      font={fontVariant}
                      weight={fontWeight}
                      variant={typographyVariant}
                    >
                      Ini Lho ITS!
                    </Typography>
                  </td>
                </tr>
              )),
            ),
          )}
        </tbody>
      </table>
    </section>
  );
}
