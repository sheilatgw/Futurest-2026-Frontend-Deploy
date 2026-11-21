"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import Typography from "@/components/typography";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import api from "@/lib/api";
import { ApiResponse } from "@/types/api";

const chartConfig = {
  count: {
    label: "Count",
    color: "#000",
  },
  data: {
    label: "Major",
    color: "#000",
  },
} satisfies ChartConfig;

interface Result {
  date: string;
  count: number;
}

interface Divition {
  subdivision: string;
  count: number;
}
interface DailyCount {
  result: Array<Result>;
}

interface Majors {
  major: string;
  count: number;
}

export default function InsightOprecStaff() {
  // Get Count Daily
  const { data: countDailyOprecStaff } = useQuery<
    AxiosResponse<ApiResponse<DailyCount>>
  >({
    queryKey: ["countDailyOprecStaff"],
    queryFn: async () => {
      const response = await api.get("/api/v1/oprec-staff/insight");
      return response;
    },
    staleTime: Infinity,
  });
  const COUNT = countDailyOprecStaff?.data.data.result;

  // Count Grouping by Major
  const { data: countDepartmentOprecStaff } = useQuery<
    AxiosResponse<ApiResponse<Majors[]>>
  >({
    queryKey: ["countDepartmentOprecStaff"],
    queryFn: async () => {
      const response = await api.get("/api/v1/oprec-staff/count/department");
      return response;
    },
    staleTime: Infinity,
  });
  const DEPARTMENT = countDepartmentOprecStaff?.data.data.sort((e) => e.count);

  // Count Grouping by Divition
  const { data: countDivition } = useQuery<
    AxiosResponse<ApiResponse<Divition[]>>
  >({
    queryKey: ["countDivition"],
    queryFn: async () => {
      const response = await api.get("/api/v1/oprec-staff/count/subdivision");
      return response;
    },
    staleTime: Infinity,
  });
  const DIVITION = countDivition?.data?.data?.sort((e) => e.count);

  return (
    <div className="mt-6 flex flex-col gap-6 max-lg:mt-0">
      <div className="flex flex-col gap-4">
        <Typography variant="h3" weight="semibold">
          Daily Count Oprec Staff
        </Typography>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={COUNT}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={20}
              angle={-15}
              height={100}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#FE6622" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col gap-4">
        <Typography variant="h3" weight="semibold">
          Count Department Registrant
        </Typography>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart layout="vertical" accessibilityLayer data={DEPARTMENT}>
            <CartesianGrid vertical={true} />
            <XAxis type="number" />
            <YAxis width={180} dataKey="department" type="category" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#FE6622" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col gap-4">
        <Typography variant="h3" weight="semibold">
          Count Subdivition Registrant
        </Typography>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart layout="vertical" accessibilityLayer data={DIVITION}>
            <CartesianGrid vertical={false} />
            <XAxis type="number" />
            <YAxis width={180} dataKey="subdivision" type="category" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="#FE6622" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
