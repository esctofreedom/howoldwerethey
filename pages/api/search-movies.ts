import type { NextApiRequest, NextApiResponse } from "next";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

type SearchResponse = {
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse | ErrorResponse>
) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query, page = 1 } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
        query as string
      )}&language=en-US&page=${page}&include_adult=false`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from TMDB");
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Search movies error:", error);
    return res.status(500).json({ error: "Failed to search movies" });
  }
}
