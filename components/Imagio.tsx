/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Clapperboard } from "lucide-react";
import { UserRoundIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Imagio = ({
  url,
  alt,
  width,
  height,
  isMovie = true,
  className,
}: {
  url: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  isMovie?: boolean;
}) => {
  const [hasError, setHasError] = React.useState(false);

  const fullUrl = `https://image.tmdb.org/t/p/w500/${url}`;

  const FallbackContent = () => (
    <div
      className="relative w-full bg-muted rounded-md flex items-center justify-center"
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {isMovie ? (
        <Clapperboard className="w-1/3 h-1/3 stroke-1 text-muted-foreground" />
      ) : (
        <UserRoundIcon className="w-1/3 h-1/3 stroke-1 text-muted-foreground" />
      )}
    </div>
  );

  if (!url || hasError) return <FallbackContent />;

  return (
    <div className="overflow-hidden rounded-lg">
      <img
        src={fullUrl}
        alt={alt}
        height={height}
        width={width}
        className={cn(
          "group-hover:scale-[105%] transition-all ease-in-out duration-200",
          className
        )}
        // onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Imagio;
