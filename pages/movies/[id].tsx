// get static paths

import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Script from "next/script";

import { MovieCard } from "../../components/MovieCard";
import { MovieDeeperInfo } from "../../components/MovieDeeperInfo";
import { ActorCard } from "components/ActorCard";
import { WatchProviders } from "components/WatchProviders";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// use getstaticpaths and getstaticprops to get data from the API from id
// export const getStaticPaths = async () => {

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

// {
//   "adult": false,
//   "gender": 2,
//   "id": 3894,
//   "known_for_department": "Acting",
//   "name": "Christian Bale",
//   "original_name": "Christian Bale",
//   "popularity": 54.534,
//   "profile_path": "/2y4doWX4lCzDMjCL5KOA4KBz6Hn.jpg",
//   "cast_id": 35,
//   "character": "Bruce Wayne",
//   "credit_id": "52fe4220c3a36847f8005d17",
//   "order": 0
// }

export type Actor = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  order: number;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
  adult: boolean;
  cast_id: number;
  credit_id: string;
  birthday?: string;
  deathday?: string;
};

export type Movie = {
  id: string;
  title: string;
  poster_path: string;
  credits: {
    cast: Actor[];
  };
};

export async function getStaticProps({ params }) {
  try {
    const { id } = params;
    const apiKey = process.env.TMDB_API_KEY;

    const newResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`
    );

    console.log("NEW RESPONSE", newResponse.data);

    // Fetch all movie data in one call
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits,similar,watch/providers`
    );
    const data = await response.json();

    // Get initial cast data for the first 10 actors
    const trimmedCast = data.credits.cast; //.slice(0, 10);

    console.log("TRIMMED CAST", trimmedCast);

    // Fetch detailed actor data in parallel
    const actorPromises = trimmedCast.map((actor) =>
      fetch(
        `https://api.themoviedb.org/3/person/${actor.id}?api_key=${apiKey}`
      ).then((res) => res.json())
    );

    const castDetails = await Promise.all(actorPromises);

    // append character name to each actor
    const castWithCharacter = castDetails.map((actor, index) => ({
      ...actor,
      character: trimmedCast[index].character,
    }));

    return {
      props: {
        movie: {
          ...data,
          similar: data.similar?.results || [],
          watchProviders: data["watch/providers"]?.results || null,
        },
        cast: castDetails,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return {
      notFound: true,
    };
  }
}

const Movie = ({ movie, cast }) => {
  console.log("MOVIE", movie);
  console.log("CAST", cast);

  const [showMoreCast, setShowMoreCast] = useState(false);

  // Add these animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Controls the delay between each card animation
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  if (!movie || !cast) {
    return (
      <div className="flex flex-grow flex-col">
        <div className="mx-auto max-w-7xl grid grid-cols-10 gap-4">
          <div className="col-span-10 md:col-span-3 flex flex-col gap-4">
            <Skeleton className="w-full h-[450px] rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="w-full h-[100px] rounded-lg" />
          </div>
          <div className="col-span-10 md:col-span-7 p-2">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-[160px] w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8">
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-6">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-[300px] w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow flex-col">
      <div className="mx-auto max-w-7xl grid grid-cols-10 gap-4">
        <div className="col-span-10 md:col-span-3 flex flex-col gap-4">
          <MovieDeeperInfo movie={movie} />
          <WatchProviders _providers={movie.watchProviders} />
          {/* <Script
            src="https://widget.justwatch.com/justwatch_widget.js"
            strategy="lazyOnload"
          />
          <div
            data-jw-widget
            // data-api-key="insert your unique API key. Leave the quotes"

            data-object-type="movie"
            data-title={movie.title}
            data-year={movie.release_date}
            data-theme="dark"
          ></div> */}
        </div>
        <div className="col-span-10 md:col-span-7 p-2">
          <motion.div
            className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {showMoreCast
              ? cast?.map((actor, index) => (
                  <motion.div key={actor.id} variants={cardVariants}>
                    <ActorCard
                      actor={actor}
                      movie={movie}
                      character={actor.character}
                    />
                  </motion.div>
                ))
              : cast?.slice(0, 10).map((actor, index) => (
                  <motion.div key={actor.id} variants={cardVariants}>
                    <ActorCard
                      actor={actor}
                      movie={movie}
                      character={actor.character}
                    />
                  </motion.div>
                ))}
          </motion.div>
          {cast.length > 10 && (
            <div className="mt-4 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowMoreCast(!showMoreCast)}
              >
                {showMoreCast ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className=" max-w-7xl mx-auto mt-8 ">
        <h3 className="mb-4">Related Movies</h3>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-6">
          {movie.similar?.slice(0, 10).map((similar) => (
            <MovieCard key={similar.id} movie={similar} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
