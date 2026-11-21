// app/api/institutions/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const query = searchParams.get("query");
  // Logic endpoint URL
  let endpoint = "";
  if (type === "UNIVERSITY") {
    endpoint = `/regional/indonesia/universities?name=${query}`;
  } else if (type === "HIGH_SCHOOL") {
    endpoint = `/regional/indonesia/schools?name=${query}`;
  } else if (type === "CITY") {
    // TAMBAHAN BARU DISINI
    endpoint = `/regional/indonesia/regencies?name=${query}`;
  } else {
    return NextResponse.json({ is_success: false, data: [] });
  }

  try {
    const res = await fetch(`https://use.api.co.id${endpoint}`, {
      headers: {
        "x-api-co-id": process.env.NEXT_PUBLIC_API_UNIVERSITIES_API || "",
      },
    });
    if (!res.ok) return NextResponse.json({ is_success: false, data: [] });
    const data = await res.json();
    if (data.data === undefined) {
      return NextResponse.json({ is_success: false, data: [] });
    }
    if (type === "HIGH_SCHOOL") {
      const allowedGrades = ["SMA", "SMK", "MA", "MAN", "MAS"];
      const filteredSchools = data.data.filter((school: any) => {
        const grade = school.grade ? school.grade.toUpperCase() : "";
        return allowedGrades.includes(grade);
      });
      data.data = filteredSchools;
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ is_success: false, data: [], error });
  }
}
