import React from "react";

import { Link, useLocation } from "react-router";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import { cn, getFirstWord } from "../lib/utils";

const TripCard = ({
  id,
  name,
  location,
  imageUrl,
  tags,
  price,
}: TripCardProps) => {
  const path = useLocation();

  return (
    <Link
      to={
        path.pathname === "/" || path.pathname.startsWith("/travel")
          ? `/travel/${id}`
          : `/trips/${id}`
      }
      className="trip-card"
    >
      <img src={imageUrl} alt={name} />

      <article>
        <h2>{name}</h2>
        <figure>
          <img
            src="/assets/icons/location-mark.svg"
            alt="location"
            className="size-4"
            loading="lazy"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>

      <div className="flex flex-wrap gap-2 mt-2.5">
        {tags?.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className={cn("text-xs px-2 font-serif py-1 rounded-full", {
              "bg-pink-50 text-pink-500": index === 1,
              "bg-success-50 text-success-700": index !== 1,
            })}
          >
            {getFirstWord(tag)}
          </span>
        ))}
        {/*<ChipListComponent id="travel-chip">
                    <ChipsDirective>
                        {tags?.map((tag, index) => (
                            <ChipDirective
                                key={index}
                                text={getFirstWord(tag)}
                                cssClass={cn(index===1
                                ? '!bg-pink-50 !text-pink-500'
                                : '!bg-success-50 !text-success-700')}
                            />
                        ))}
                    </ChipsDirective>
                </ChipListComponent>*/}
      </div>

      <article className="tripCard-pill">{price}</article>
    </Link>
  );
};
export default TripCard;
