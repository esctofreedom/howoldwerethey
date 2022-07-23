import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
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

export const ActorCard = ({ actor }) => {
  console.log("actor", actor);
  return (
    <Link href={`/actor/${actor.id}`}>
      <div className="card flex flex-col   animate transition-all ease-in-out hover:scale-105 cursor-pointer overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.title}
          height={750}
          width={500}
        />
        <div className="flex flex-col w-full items-start justify-start p-2 text-clip">
          <h6 className="font-semibold text-sm  truncate">{actor.name}</h6>

          <div className="flex w-full flex-row gap-2">
            {/* <label>{dayjs(movie.release_date).format("YYYY")}</label> */}
            <div className="flex-grow"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};
