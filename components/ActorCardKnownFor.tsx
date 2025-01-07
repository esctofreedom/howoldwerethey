import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StarIcon } from "lucide-react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface ActorCardKnownForProps {
  actor: any;
}

const ActorCardKnownFor = ({ actor }: { actor: any }) => {
  return (
    <div
      className="absolute z-50 right-0   
  translate-x-[0%] opacity-0 
  group-hover:translate-x-[50%] group-hover:opacity-100 
  transition-all duration-300 ease-in-out 
  flex items-center justify-end p-2"
    >
      <div className="flex flex-col gap-2">
        {actor.known_for?.slice(0, 3).map((movie, index) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <Tooltip key={movie.id}>
              <TooltipTrigger>
                <div
                  key={movie.id}
                  className="aspect-auto rounded-md overflow-hidden shadow-xl "
                  title={`${movie.title || movie.name} (${dayjs(
                    movie.release_date
                  ).format("YYYY")})`}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    height={48}
                    width={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-background w-[400px] grid grid-cols-5 cursor-pointer">
                <div className="col-span-2 relative aspect-[2/3] rounded-md overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-3 p-3 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {/* year */}
                      {dayjs(movie.release_date).format("YYYY")}
                    </span>
                    {/* score */}
                    <span className="text-xs font-mono text-muted-foreground flex gap-1 items-center">
                      <StarIcon className="w-3 h-3" />
                      {movie.vote_average}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-normal text-foreground text-base line-clamp-1 truncate">
                      {movie.title || movie.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground line-clamp-5">
                    {movie.overview}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActorCardKnownFor;
