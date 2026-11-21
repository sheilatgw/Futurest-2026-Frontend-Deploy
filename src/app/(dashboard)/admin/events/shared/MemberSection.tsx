import ButtonLink from "@/components/links/button-link";
import Typography from "@/components/typography";
import {
  CompetitionParticipant,
  CompetitionTeam,
} from "@/types/page/team-detail-competition";
import { ChevronRight } from "lucide-react";

interface MemberSectionProps {
  member: CompetitionParticipant | null;
  role: string;
  showBorder?: boolean;
  onImageClick?: (url: string) => void; // Tambahan props buat modal gambar
  team?: CompetitionTeam;
}

export default function MemberSection({
  member,
  role,
  showBorder,
  onImageClick,
  team,
}: MemberSectionProps) {
  if (!member || !member.name) return null;

  const supportingFiles = [
    { label: "KTM / Identity Card", url: member.ktm },
    {
      label: "Abstract (REII, REPI) / FULL PAPER (BCC)",
      url: null, // gaada di API response
    },
    {
      label: "Follow Instagram @futurest2026",
      url: member.instagram_follow_futurest,
    },
    {
      label: "Follow Instagram @sre_its",
      url: member.instagram_follow_sre,
    },
    {
      label: "Twibbon and tag @futurest2026",
      url: member.twibbon_upload,
    },
    {
      label: "Bukti upload Instagram Story poster and tag @futurest2026",
      url: member.poster_sharing_ig_story,
    },
    {
      label: "Share poster and broadcast Competition to 2 group",
      url: member.poster_sharing_group,
    },
    { label: "Mention 3 friends", url: member.friend_mentions },
    {
      label: "Instagram account not private (public)",
      url: member.public_account_proof,
    },
  ];

  return (
    <div
      className={showBorder ? "border-b-2 border-neutral-200 pb-12 mb-12" : ""}
    >
      <Typography
        variant="h5"
        font="FiraSans"
        weight="semibold"
        className="text-[#3454D1]"
      >
        {role}
      </Typography>
      <Typography
        variant="h2"
        font="FiraSans"
        weight="bold"
        className="text-neutral-900 pb-4 md:pb-[24px]"
      >
        {member.name}
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal data */}
        <div className="space-y-3">
          <div className="border-2 border-neutral-200 rounded-lg w-full mx-auto overflow-hidden">
            <div className="p-6 border-b border-neutral-400">
              <Typography
                font="Sora"
                variant="t"
                weight="bold"
                className="text-left"
              >
                Personal Data
              </Typography>
            </div>
            <div className="divide-y divide-neutral-200">
              <div className="p-6 flex justify-between items-center">
                <Typography font="Sora" variant="t" weight="regular">
                  Full Name
                </Typography>
                <Typography font="Sora" variant="t" weight="regular">
                  {member.name}
                </Typography>
              </div>
              <div className="p-6 flex justify-between items-center">
                <Typography font="Sora" variant="t" weight="regular">
                  Email
                </Typography>
                <Typography font="Sora" variant="t" weight="regular">
                  {member.email || "-"}
                </Typography>
              </div>
              <div className="p-6 flex justify-between items-center">
                <Typography font="Sora" variant="t" weight="regular">
                  Phone Number
                </Typography>
                <Typography font="Sora" variant="t" weight="regular">
                  {member.phone || "-"}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Files */}
        <div className="space-y-3">
          <div className="border border-neutral-200 rounded-lg w-full mx-auto overflow-hidden">
            <div className="p-4 border-b border-neutral-400 flex justify-between items-center bg-gray-50">
              <Typography
                font="Sora"
                variant="t"
                weight="bold"
                className="text-left"
              >
                Supporting Files
              </Typography>
              {team?.google_drive_link && (
                <ButtonLink
                  size="base"
                  variant="primary"
                  href={team.google_drive_link}
                  className="bg-[#3454D1] hover:bg-blue-800 text-white"
                  rightIcon={ChevronRight}
                  target="_blank"
                >
                  Google Drive
                </ButtonLink>
              )}
            </div>

            <div className="space-y-4 p-6">
              {supportingFiles.map((file, index) => {
                const isUploaded = !!file.url;

                return (
                  <div key={index} className="flex items-start gap-3">
                    {/* BUNGKUS RADIO & TEKS DALAM BUTTON JIKA FILE ADA */}
                    {isUploaded ? (
                      <button
                        onClick={() => onImageClick && onImageClick(file.url!)}
                        className="group flex items-start gap-3 text-left w-full focus:outline-none"
                      >
                        {/* Radio Button Style (Aktif) */}
                        <div className="mt-0.5 flex-shrink-0">
                          <div className="w-5 h-5 rounded-full border-2 border-[#3454D1] bg-white flex items-center justify-center transition-colors group-hover:bg-blue-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#3454D1]" />
                          </div>
                        </div>

                        {/* Teks Label (Bisa diklik, berubah warna & underline saat hover) */}
                        <Typography
                          font="Sora"
                          variant="t"
                          weight="regular"
                          className="text-[#3454D1] transition-colors group-hover:underline group-hover:text-blue-800"
                        >
                          {file.label}
                        </Typography>
                      </button>
                    ) : (
                      // JIKA FILE TIDAK ADA / NULL (Render Tampilan Mati)
                      <div className="flex items-start gap-3 w-full">
                        {/* Radio Button Style (Mati) */}
                        <div className="mt-0.5 flex-shrink-0">
                          <div className="w-5 h-5 rounded-full border-2 border-neutral-300 bg-white" />
                        </div>

                        {/* Teks Label (Abu-abu) */}
                        <Typography
                          font="Sora"
                          variant="t"
                          weight="regular"
                          className="text-gray-500"
                        >
                          {file.label}
                        </Typography>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
