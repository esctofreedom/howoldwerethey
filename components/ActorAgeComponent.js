import Image from "next/image";
import Link from "next/link";
import { AgeComponent } from "./AgeComponent";

export const ActorAgeComponent = ({ actor, movie }) => {
  console.log("actor", actor);
  const character = movie.credits.cast.find(
    (cast) => cast.id === actor.id
  ).character;

  return (
    <Link href="/actor/[id]" as={`/actor/${actor.id}`}>
      <div className="card flex flex-row gap-3 max-w-lg rounded-md overflow-hidden cursor-pointer">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          height={96}
          width={64}
          className="min-w-[64px]"
        />
        <div className="flex flex-col max-w-sm">
          <h4 className="truncate">{actor.name}</h4>
          {/*  find actor in movie object */}

          <label className="text-overflow: ellipsis;">{character}</label>
        </div>
        <div className="flex-grow"></div>
        {/* birth date of actor */}
        <div className="p-2">
          <AgeComponent
            birthday={actor.birthday}
            movieDate={movie.release_date}
          />
        </div>
      </div>
    </Link>
  );
};
