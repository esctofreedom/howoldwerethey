import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { AgeComponent } from "./AgeComponent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MovieDeeperInfo } from "./MovieDeeperInfo";
import { FlameIcon, SkullIcon, StarIcon } from "lucide-react";
import ActorCardKnownFor from "./ActorCardKnownFor";
import Imagio from "./Imagio";

export const ActorCard = ({
  actor,
  movie,
  character,
}: {
  actor: any;
  movie?: any;
  character?: string;
}) => {
  const isDead = actor.deathday ? true : false;
  const size = 2;
  const isPopular = actor.popularity > 70;

  // console.log("actor", actor);
  return (
    <Link href={`/actor/${actor.id}`}>
      <div className="group relative  flex flex-col animate transition-all cursor-pointer">
        <div className="overflow-hidden rounded-lg relative ">
          {/* <Image
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.title}
              height={750}
              width={500}
              className={`group-hover:scale-[105%]  group-hover:opacity-100 overflow-hidden transition-all ease-in-out duration-200 rounded-md ${
                isDead ? "grayscale contrast-150 opacity-30" : "opacity-95"
              }`}
            /> */}

          <Imagio
            url={actor.profile_path}
            alt={actor.title}
            width={500}
            height={750}
            isMovie={false}
            className={`group-hover:scale-[105%]  group-hover:opacity-100 overflow-hidden transition-all ease-in-out duration-200 rounded-md ${
              isDead ? "grayscale contrast-150 opacity-30" : "opacity-95"
            }`}
          />

          {/* Popularity */}

          <div className="absolute  gap-2 z-50 top-0 right-0 border-1 h-10 w-10 flex items-center justify-center border-background">
            {isPopular && (
              <div className="flex flex-col items-center justify-center bg-amber-500/80  p-1 rounded-full ">
                <FlameIcon className="size-4 text-white" />
              </div>
            )}
            {isDead && (
              <div className="flex flex-col items-center justify-center rounded-md bg-muted/50 px-2 py-1">
                <span
                  className="text-xs text-white font-bold font-mono"
                  style={{
                    textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  RIP
                </span>
              </div>
            )}
          </div>

          {/* Age  */}
          {actor.birthday && (
            <div className="translate-x-2 translate-y-2 absolute bg-background z-50 bottom-0 right-0 rounded-t-full rounded-bl-full border-1 h-12 w-12 flex items-center justify-center border-background">
              {/* Black background circle - made slightly larger */}

              <AgeComponent
                birthday={actor.birthday}
                movieDate={movie?.release_date}
                deathDate={actor.deathday}
                size=""
              />
            </div>
          )}
        </div>

        {/* Known for */}
        <ActorCardKnownFor actor={actor} />

        <div className="flex flex-col w-full items-start justify-start py-2 text-clip">
          <span className="font-normal text-sm text-muted-foreground group-hover:text-foreground/70  truncate w-full">
            {actor.name}
          </span>

          {/* if character name is passed, display here */}
          {character && (
            <span className="font-normal text-sm text-muted-foreground group-hover:text-foreground/70  truncate w-full">
              {character}
            </span>
          )}

          <div className="flex w-full flex-row gap-2">
            {/* <label>{dayjs(movie.release_date).format("YYYY")}</label> */}
            <div className="flex-grow"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};
