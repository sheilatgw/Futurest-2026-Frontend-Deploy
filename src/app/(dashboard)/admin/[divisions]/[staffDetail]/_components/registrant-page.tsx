"use client";

import Typography from "@/components/typography";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDetailRegistrant from "@/hooks/use-get-detail-registrant"; // Asumsi path hook
import { RegistrantData } from "@/types/page/registrant-data";
import {
  Badge,
  FileX,
  LinkIcon,
  Mail,
  MessageSquare,
  School,
  Smartphone,
  User,
} from "lucide-react";

type PageProps = {
  id: string;
};

export function DashboardPage({ id }: PageProps) {
  // Menggunakan hook untuk mengambil data
  const { detailData: registrant, isLoading: isRegistrantLoading } =
    useGetDetailRegistrant(id);

  const data = registrant as RegistrantData | undefined;

  const roles = ["Leader", "Team Member 1", "Team Member 2", "Team Member 3"];

  return (
    <main className="container mx-auto py-10 space-y-16">
      {roles.map((role) => (
        <section key={role}>
          {/* === Bagian Header Halaman === */}
          <header className="mb-8">
            <Typography className="md:text-2xl text-2xl font-semibold text-[#3454D1]">
              {role}
            </Typography>

            {isRegistrantLoading ? (
              <Skeleton className="h-10 w-1/2 rounded-lg" />
            ) : (
              <Typography className="md:text-3xl font-bold">
                {registrant?.data.name}
              </Typography>
            )}
          </header>

          {/* === Layout Utama (Grid 2 Kolom) === */}
          <div className="flex flex-col lg:flex-row w-full gap-6">
            {/* --- Kolom Kiri (Data Diri) --- */}
            <div className="flex flex-col gap-6 w-full lg:w-5/12 xl:w-1/3 shrink-0">
              <DataDiriCard registrant={data} isLoading={isRegistrantLoading} />
            </div>

            {/* --- Kolom Kanan (Dokumen) --- */}
            <div className="flex flex-col gap-6 flex-1">
              <DokumenCard registrant={data} isLoading={isRegistrantLoading} />
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

// --- 3. Komponen Data Diri (Sudah Dinamis) ---
function DataDiriCard({
  registrant,
  isLoading,
}: {
  registrant?: RegistrantData;
  isLoading: boolean;
}) {
  const dataDiri = [
    { label: "Nama Lengkap", value: registrant?.data.name, icon: <User /> },
    { label: "Email", value: registrant?.data.email, icon: <Mail /> },
    { label: "NRP / NIM", value: registrant?.data.student_id, icon: <Badge /> },
    { label: "Jurusan", value: registrant?.data.department, icon: <School /> },
    { label: "Angkatan", value: registrant?.data.batch, icon: <School /> },
    {
      label: "Nomor WhatsApp",
      value: registrant?.data.phone_number,
      icon: <Smartphone />,
    },
    {
      label: "ID LINE",
      value: registrant?.data.line_id,
      icon: <MessageSquare />,
    },
    {
      label: "Accepted Division",
      value: registrant?.data.accepted_division,
      icon: <MessageSquare />,
    },
  ];

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-center">Data Diri</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="divide-y divide-border">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 items-center px-6 py-4"
                  >
                    <Skeleton className="h-4 w-32 mx-auto" />
                    <Skeleton className="h-4 w-40 mx-auto" />
                  </div>
                ))
            : dataDiri.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-2 items-center px-6 py-4 min-h-[118.5px]"
                >
                  {/* Kiri — Label */}
                  <span className="text-sm text-muted-foreground text-center">
                    {item.label}
                  </span>

                  {/* Kanan — Value */}
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

// --- 4. Komponen Dokumen (Sudah Dinamis) ---
function DokumenCard({
  registrant,
  isLoading,
}: {
  registrant?: RegistrantData;
  isLoading: boolean;
}) {
  // Daftar dokumen dari API
  const documents = [
    { title: "Kartu Tanda Siswa", href: registrant?.data.ktm },
    { title: "Curriculum Vitae (CV)", href: registrant?.data.curriculum_vitae },
    {
      title: "Bukti follow IG FUTUREST",
      href: registrant?.data.followed_ig_futurest,
    },
    { title: "Bukti follow IG SRE", href: registrant?.data.followed_ig_sre },
    { title: "Bukti upload story IG", href: registrant?.data.repost_feeds },
    { title: "Bukti upload twibbon", href: registrant?.data.twibbon },
    { title: "Portofolio", href: registrant?.data.portfolio_asset_link },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dokumen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {isLoading
            ? // Skeleton Loading
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <Skeleton className="h-48 w-full rounded-lg" />
                  </div>
                ))
            : // Data Sebenarnya
              documents.map((doc) => (
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

// Helper baru untuk menampilkan link dokumen (menggantikan DokumenPlaceholder)
function DokumenLink({ title, href }: { title: string; href?: string | null }) {
  const content = (
    <div
      className={`
        flex items-center justify-center w-full h-48
        rounded-lg border-2 border-dashed
        ${
          href
            ? "border-border bg-muted/30 text-muted-foreground hover:border-blue-500 hover:text-blue-600 transition-colors"
            : "border-red-500/30 bg-red-500/5 text-red-500/70"
        }
      `}
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
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka ${title}`}
        >
          {content}
        </a>
      ) : (
        <div title="Dokumen tidak diupload">{content}</div>
      )}
      {/* Jika link null, tampilkan pesan */}
      {!href && (
        <p className="text-xs text-red-500 text-center -mt-1">Tidak ada file</p>
      )}
    </div>
  );
}
