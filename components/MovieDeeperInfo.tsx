import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/solid";
import Imagio from "./Imagio";
const example = {
  adult: false,
  backdrop_path: "/393mh1AJ0GYWVD7Hsq5KkFaTAoT.jpg",
  genre_ids: [12, 28, 878],
  id: 507086,
  original_language: "en",
  original_title: "Jurassic World Dominion",
  overview:
    "Four years after Isla Nublar was destroyed, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures.",
  popularity: 10639.744,
  poster_path: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
  release_date: "2022-06-01",
  title: "Jurassic World Dominion",
  video: false,
  vote_average: 7,
  vote_count: 1850,
};

export const MovieDeeperInfo = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const backdropUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

  console.log("posterUrl", backdropUrl);

  return (
    <div className=" flex flex-row md:flex-col relative  overflow-hidden  md:h-auto gap-4">
      {/* <div
          className="md:absolute 
        block h-full w-full bg-gradient-to-b from-black/80 to-transparent z-10 p-4"
        >
          <div className="flex-grow"></div>
        </div> */}
      <div className="w-full flex justify-center">
        <div className="w-full h-full bg-muted rounded-lg object-cover  ">
          <Imagio
            url={posterUrl}
            alt={movie.title}
            height={800}
            width={800}
            className="rounded-lg object-cover"
            isMovie={true}
          />
        </div>
      </div>
      <div className="flex flex-col flex-shrink w-full  text-clip bg-background items-start justify-start ">
        <h6 className="font-medium text-2xl  truncate text-secondary-foreground">
          {movie.title}
        </h6>

        <div className="flex w-full flex-row gap-2">
          <span className="font-normal text-base text-muted-foreground">
            {dayjs(movie.release_date).format("YYYY")}
          </span>

          <div className="flex-grow"></div>

          <span className="font-bold text-base flex gap-2 items-center text-foreground font-mono">
            <StarIcon className="h-5 w-5 text-amber-500" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <span className="text-muted-foreground font-light text-sm text-balance w-full">
          {movie.overview}
        </span>
      </div>
    </div>
  );
};
