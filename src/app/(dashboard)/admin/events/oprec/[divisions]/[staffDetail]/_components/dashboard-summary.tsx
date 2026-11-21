import Typography from "@/components/typography";
import { AlertCircle, CheckCircle, Pencil, XCircle } from "lucide-react";

const statusIcons = {
  accepted: <CheckCircle className="text-green-500" size={28} />,
  interview: <Pencil className="text-orange-500" size={28} />,
  rejected: <XCircle className="text-red-500" size={28} />,
  total: <AlertCircle className="text-gray-400" size={28} />,
};

type StatsItem = {
  type: "accepted" | "interview" | "rejected" | "total";
  label: string;
  value: number | string;
};

export default function DashboardSummary({ stats }: { stats: StatsItem[] }) {
  return (
    <div className=" w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center bg-white shadow-sm rounded-xl p-4 border border-gray-100"
        >
          <div className="flex items-center justify-evenly w-full">
            <div>{statusIcons[item.type]}</div>
            <div className="text-group">
              <Typography variant="l" className="mt-2 text-gray-700">
                {item.label}
              </Typography>
              <Typography className="text-2xl font-bold">
                {item.value}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
