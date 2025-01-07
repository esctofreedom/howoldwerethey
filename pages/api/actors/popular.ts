import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.TMDB_API_KEY;
  const { page = 1 } = req.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`
    );
    const data = await response.json();

    // Return the results directly for consistency with other endpoints
    res.status(200).json(data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular actors" });
  }
}
