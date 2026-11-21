"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
export default function EventDetailPageWrapper() {
  const params = useParams();
  const eventId = params.eventId as string;

  // Temporary list to test navigation
  const tempParticipants = [
    { id: "ea9ab2c3-7501-405a-b83c-0be4a5bef335", name: "Team Alpha" },
    { id: "1585fb35-a779-4b70-99b5-d02493009df3", name: "Jagooo" },
    { id: "f22fd526-a68a-467c-b460-a5fe954c2c64", name: "Kelass" },
    { id: "8d8226bd-4d36-4fe3-9a75-4c63afe70299", name: "Jagooo Polll" },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Participants for {eventId}</h1>
      <ul className="space-y-2">
        {tempParticipants.map((p) => (
          <li key={p.id}>
            <Link
              href={`/admin/events/${eventId}/${p.id}`}
              className="text-blue-600 hover:underline"
            >
              View {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
