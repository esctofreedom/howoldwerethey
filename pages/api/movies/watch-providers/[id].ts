import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`
    );
    const data = await response.json();

    // TMDB returns results by country, we'll focus on US results
    const usProviders = data.results?.US || null;

    res.status(200).json({
      flatrate: usProviders?.flatrate || [],
      rent: usProviders?.rent || [],
      buy: usProviders?.buy || [],
      link: usProviders?.link || null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch watch providers" });
  }
}
