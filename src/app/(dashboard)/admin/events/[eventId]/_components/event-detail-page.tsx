"use client";

import Typography from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import useGetEventDetail from "@/hooks/use-get-event-detail";
import { EventDetailFieldResponse } from "@/types/page/event-detail-data";
import { FileX, LinkIcon } from "lucide-react";

type PageProps = {
  id: string;
};

export function EventDetailPage({ id }: PageProps) {
  const { eventData, isLoading } = useGetEventDetail(id);
  const data = eventData?.data as EventDetailFieldResponse | undefined;

  // Define the roles we want to display
  const roles = ["Leader", "Member 2", "Member 3"];

  return (
    <main className="container mx-auto py-10 space-y-12">
      {roles.map((role) => {
        // Prepare data for this specific role
        const personData = getPersonData(data, role);

        // If it's a member role and no name exists, skip rendering this section
        if (role !== "Leader" && !personData.name) return null;

        return (
          <section key={role} className="space-y-6">
            <header>
              <Typography className="md:text-2xl text-2xl font-semibold text-[#3454D1]">
                {role === "Leader" ? "Team Leader" : `Team ${role}`}
              </Typography>
              {isLoading ? (
                <Skeleton className="h-8 w-64 rounded-lg" />
              ) : (
                <Typography className="md:text-3xl font-bold">
                  {personData.name || "-"}
                </Typography>
              )}
            </header>

            <div className="flex flex-col lg:flex-row w-full gap-6">
              {/* Left: Person Data */}
              <div className="flex flex-col gap-6 w-full lg:w-5/12 xl:w-1/3 shrink-0">
                <DataDiriCard person={personData} isLoading={isLoading} />
              </div>

              {/* Right: Documents */}
              <div className="flex flex-col gap-6 flex-1">
                <DokumenCard role={role} data={data} isLoading={isLoading} />
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

// --- Helper Types & Functions ---

type PersonData = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  university?: string;
  faculty?: string;
  study_program?: string;
};

function getPersonData(
  data: EventDetailFieldResponse | undefined,
  role: string,
): PersonData {
  if (!data) return {};

  if (role === "Leader") {
    return {
      name: data.team_leader_name,
      email: data.team_leader_email,
      phone: data.team_leader_phone,
      university: data.university,
      faculty: data.faculty,
      study_program: data.study_program,
    };
  } else if (role === "Member 2") {
    return {
      name: data.team_member_2_name,
      email: data.team_member_2_email,
    };
  } else if (role === "Member 3") {
    return {
      name: data.team_member_3_name,
      email: data.team_member_3_email,
    };
  }
  return {};
}

// --- Components ---

function DataDiriCard({
  person,
  isLoading,
}: { person: PersonData; isLoading: boolean }) {
  // Re-added labels but removed icons
  const items = [
    { label: "Nama Lengkap", value: person.name },
    { label: "Email", value: person.email },
    { label: "Nomor WhatsApp", value: person.phone },
    { label: "Universitas", value: person.university },
    { label: "Fakultas", value: person.faculty },
    { label: "Prodi", value: person.study_program },
  ].filter(
    (item) =>
      item.value !== undefined && item.value !== null && item.value !== "",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Diri</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="divide-y divide-border">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 items-center px-6 py-4"
                  >
                    <Skeleton className="h-4 w-24 mx-auto" />
                    <Skeleton className="h-4 w-32 mx-auto" />
                  </div>
                ))
            : items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 items-center px-6 py-4"
                >
                  <span className="text-sm text-muted-foreground text-center">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-center break-words">
                    {item.value || "-"}
                  </span>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DokumenCard({
  role,
  data,
  isLoading,
}: { role: string; data?: EventDetailFieldResponse; isLoading: boolean }) {
  let documents: { title: string; href?: string | null }[] = [];

  if (role === "Leader") {
    documents = [
      { title: "Bukti Follow IG", href: data?.instagram_follow },
      { title: "Bukti Repost IG", href: data?.instagram_repost },
      { title: "Bukti Story IG", href: data?.instagram_story },
      { title: "Abstrak", href: data?.study_case_abstract_file },
      { title: "Bukti Pembayaran", href: data?.payment_proof },
    ];
  }

  if (documents.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dokumen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                ))
            : documents.map((doc) => (
                <DokumenLink
                  key={doc.title}
                  title={doc.title}
                  href={doc.href}
                />
              ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DokumenLink({ title, href }: { title: string; href?: string | null }) {
  const content = (
    <div
      className={`flex items-center justify-center w-full h-48 rounded-lg border-2 border-dashed ${href ? "border-border bg-muted/30 text-muted-foreground hover:border-blue-500 hover:text-blue-600" : "border-red-500/30 bg-red-500/5 text-red-500/70"}`}
    >
      {href ? (
        <LinkIcon className="w-10 h-10" />
      ) : (
        <FileX className="w-10 h-10" />
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{title}</label>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <div title="Not uploaded">{content}</div>
      )}
    </div>
  );
}
