import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID");
    }

    // Fetch movie details
    const movieResponse = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,similar,watch/providers`
    );

    console.log("MOVIE RESPONSE", movieResponse.data);
    if (!movieResponse) {
      throw new Error("Failed to fetch movie");
    }

    const movieData = movieResponse.data;

    // Get cast details with additional info for each actor
    const castPromises = movieData.credits.cast
      .slice(0, 5)
      .map(async (actor: any) => {
        const personResponse = await axios.get(
          `${TMDB_BASE_URL}/person/${actor.id}?api_key=${TMDB_API_KEY}`
        );
        const personData = personResponse.data;

        return {
          ...actor,
          birthday: personData.birthday,
          place_of_birth: personData.place_of_birth,
          biography: personData.biography,
        };
      });

    const castWithDetails = await Promise.all(castPromises);

    // Construct the final response
    const response = {
      ...movieData,
      credits: {
        ...movieData.credits,
        cast: castWithDetails,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("[MOVIE_ID]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
