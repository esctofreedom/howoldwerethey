import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie recommendations" });
  }
}
