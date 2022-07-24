import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/solid";
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
    <Link href={`/movies/${movie.id}`}>
      <div className="card flex flex-col relative  overflow-hidden  lg:h-auto">
        <div
          className="md:absolute 
        block h-full w-full bg-gradient-to-b from-black/80 to-transparent z-10 p-4"
        >
          <div className="flex-grow"></div>

          <div className="flex flex-col flex-shrink w-full p-2 text-clip ">
            <div className="flex-grow"></div>
            <h6 className="font-semibold text-3xl  truncate text-slate-100">
              {movie.title}
            </h6>

            <div className="flex w-full flex-row gap-2">
              <span className="font-bold text-lg text-slate-300 dark:text-denim-200">
                {dayjs(movie.release_date).format("YYYY")}
              </span>

              <div className="flex-grow"></div>

              <span className="font-bold text-lg flex gap-2 items-center text-white">
                <StarIcon className="h-6 w-6 text-amber-500" />
                {movie.vote_average.toFixed(1)}
              </span>
            </div>

            <span className="text-slate-300 dark:text-denim-100 font-normal">
              {movie.overview}
            </span>
          </div>
        </div>
        <div className="w-full md:block hidden">
          <Image
            src={posterUrl}
            alt={movie.title}
            height={750}
            width={500}
            layout="responsive"
          />
        </div>
      </div>
    </Link>
  );
};
