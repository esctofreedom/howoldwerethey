import { StarIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import Imagio from "./Imagio";
import { AgeComponent } from "./AgeComponent";

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

export const MovieCard = ({
  movie,
  actorBirthdate,
  actorDeathDate,
}: {
  movie: any;
  actorBirthdate?: string;
  actorDeathDate?: string;
}) => {
  // console.log("movie", movie);
  // const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  // const backdropUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

  // console.log("posterUrl", backdropUrl);

  return (
    <Link href={`/movies/${movie.id}`}>
      <div className=" flex flex-col relative   animate transition-all ease-in-out hover:opacity-100 opacity-95 group rounded-md cursor-pointer overflow-hidden">
        <div className="relative">
          <Imagio
            url={movie.poster_path}
            alt={movie.title}
            width={500}
            isMovie={true}
            height={750}
            className="group-hover:scale-[105%] transition-all ease-in-out duration-200"
          />

          {actorBirthdate && (
            <div className="absolute top-2 right-2 rounded-full shadow-xl shadow-black/50 ">
              <AgeComponent
                birthday={actorBirthdate}
                deathDate={actorDeathDate}
                movieDate={movie.release_date}
                size={16}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col w-full items-start justify-start py-2 text-clip">
          <span className="font-normal text-base text-foreground/80  truncate">
            {movie.title}
          </span>

          <div className="flex w-full flex-row gap-2 justify-between">
            <label className="text-muted-foreground text-xs">
              {dayjs(movie.release_date).format("YYYY")}
            </label>
            {movie.vote_average > 0 && (
              <label className="font-medium font-mono text-xs flex gap-1 items-center">
                <StarIcon className="h-3 w-3 text-amber-500" />
                {movie.vote_average.toFixed(1)}
              </label>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
