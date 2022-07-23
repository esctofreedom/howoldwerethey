// get static paths

import axios from "axios";
import { useEffect, useState } from "react";
import { ActorAgeComponent } from "../../components/ActorAgeComponent";
import Image from "next/image";
import { MovieCard } from "../../components/movieCard";
import { MovieDeeperInfo } from "../../components/MovieDeeperInfo";

// use getstaticpaths and getstaticprops to get data from the API from id
// export const getStaticPaths = async () => {

export async function getServerSideProps({ query }) {
  const id = query.id;
  const baseUrl = "https://api.themoviedb.org/3/";
  const key = "b00fb54297384d5eaa45556b05fbb775";

  const url =
    baseUrl + "movie/" + id + "?api_key=" + key + "&append_to_response=credits";

  const response = await axios.get(url);
  const data = response.data;
  const movie = data;

  // get related movies
  const url2 = baseUrl + "movie/" + id + "/similar?api_key=" + key;
  const response2 = await axios.get(url2);
  const similar = response2.data;

  return {
    props: {
      movie,
      similar,
    },
  };
}

const Movie = ({ movie, similar }) => {
  const trimmedCast = movie.credits.cast.slice(0, 10);

  // state for cast
  const [cast, setCast] = useState([]);

  const getFurtherData = async (trimmedCast) => {
    const baseUrl = "https://api.themoviedb.org/3/";
    const key = "b00fb54297384d5eaa45556b05fbb775";
    // map through the cast array and get the full actor info
    trimmedCast.map(async (actor) => {
      const url = baseUrl + "person/" + actor.id + "?api_key=" + key;
      await axios.get(url).then((response) => {
        const actor = response.data;

        // check if actor already exists in cast array
        if (!cast.some((a) => a.id === actor.id)) {
          setCast((prevCast) => [...prevCast, actor]);
        } else {
          //
          
        }
      });
    });
    return null;
  };

  useEffect(() => {
    getFurtherData(trimmedCast);
  }, []);

  console.log("cast", cast);
  console.log("movie", movie);

  console.log("similar", similar);

  return (
    <div className="mx-auto max-w-7xl grid grid-cols-10">
      <div className="col-span-5">
        <MovieDeeperInfo movie={movie} />

        <h3 className="px-4">Similar Movies</h3>
        <div className="grid grid-cols-5">
          {similar?.results.slice(0, 4).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <div className="col-span-5">
        <div className="flex flex-col gap-1">
          {cast?.map((actor) => (
            <ActorAgeComponent actor={actor} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
