"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Number of Movies",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function ActorBarChart({ movies }: { movies: any[] }) {
  // Aggregate movies by year
  const moviesByYear = movies.reduce(
    (acc: { [key: string]: number }, movie) => {
      const year = new Date(movie.release_date).getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    },
    {}
  );

  // Convert to array format for recharts
  const chartData = Object.entries(moviesByYear).map(([year, count]) => ({
    year: parseInt(year),
    count,
  }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <XAxis dataKey="year" />
        <ChartTooltip
          content={
            <ChartTooltipContent labelFormatter={(value) => `Year: ${value}`} />
          }
        />
        <Bar dataKey="count" fill="url(#colorGradient)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
