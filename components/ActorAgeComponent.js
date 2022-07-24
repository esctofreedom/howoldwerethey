import Image from "next/image";
import Link from "next/link";
import { AgeComponent } from "./AgeComponent";

export const ActorAgeComponent = ({ actor, movie }) => {
  const character = movie.credits.cast.find(
    (cast) => cast.id === actor.id
  ).character;

  return (
    // <Link href="/actor/[id]" as={`/actor/${actor.id}`}>
    //   <div className="card flex flex-row gap-3 max-w-lg rounded-md overflow-hidden cursor-pointer">
    //     <Image
    //       src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
    //       height={96}
    //       width={64}
    //       className="min-w-[64px]"
    //     />
    //     <div className="flex flex-col max-w-sm">
    //       <h4 className="truncate">{actor.name}</h4>
    //       {/*  find actor in movie object */}

    //       <label className="text-overflow: ellipsis;">{character}</label>
    //     </div>
    //     <div className="flex-grow"></div>
    //     {/* birth date of actor */}
    //     <div className="p-2">
    //       <AgeComponent
    //         birthday={actor.birthday}
    //         movieDate={movie.release_date}
    //       />
    //     </div>
    //   </div>
    // </Link>

    <Link href="/actor/[id]" as={`/actor/${actor.id}`}>
      <div className="card flex flex-col  animate transition-all ease-in-out hover:scale-105 cursor-pointer overflow-hidden relative">
        <div className="w-full">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
            height={192}
            width={128}
            layout="responsive"
          />
        </div>

        <div className="flex flex-col w-full items-start justify-start p-2 text-clip ">
          <div className="grid grid-cols-6 whitespace-nowrap overflow-clip truncate">
            <div className="col-span-4 whitespace-nowrap overflow-clip">
              <h6 className="font-semibold text-sm  truncate">{actor.name}</h6>
              <label className=" text-xs">{character}</label>
            </div>

            <div className="col-span-2 flex items-center justify-end">
              <AgeComponent
                birthday={actor.birthday}
                movieDate={movie.release_date}
                size=""
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
