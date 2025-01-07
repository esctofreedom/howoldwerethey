import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${name}?api_key=${apiKey}&append_to_response=credits,videos,similar`
    );
    const data = await response.json();
    res.status(200).json(data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
}
