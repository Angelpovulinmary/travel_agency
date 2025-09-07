import { Header, TripCard } from "components";
import { Navigate, useNavigate, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/TripDetail";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import { InfoPill } from "components";
import { cn, getFirstWord, parseTripData } from "lib/utils";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import { redirect } from "react-router";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;
  if (!tripId) {
    throw new Error("tripid is required");
  }
  const [trip, trips] = await Promise.all([
    getTripById(tripId),
    getAllTrips(4, 0),
  ]);
  {
    /*Promise.all() expects an array of promises as input.
It runs all those promises in parallel.
When all of them are done, it gives you back an array of results, in the same order as the promises you passed in. */
  }
  return {
    trip,
    allTrips: trips.allTrips.map(({ $id, tripDetails, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetails), //we can parse all of details
      imageUrls: imageUrls ?? [],
    })),
  };
};

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
  const imageUrls = loaderData?.trip?.imageUrls || [];
  const tripData = parseTripData(loaderData?.trip?.tripDetails);
  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
  } = tripData || {};
  const allTrips = loaderData.allTrips as Trip[] | [];
  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
  ];
  const visitTimeAndWeatherinfo = [
    { title: "Best Time to Visit:", items: bestTimeToVisit },
    { title: "weather:", items: weatherInfo },
  ];
  const navigate = useNavigate();

  return (
    <main className="travel-detail wrapper relative">
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />
      <span className=" absolute md:right-10 right-0 top-0">
        <button
          onClick={() => {
            navigate("/trips");
          }}
          className="cursor-pointer p-24-semibold button-class-secondary p-4"
        >
          <img
            src="/assets/icons/arrow-left.svg"
            alt="logout"
            className="size-6 md:size-8"
          />
          Go Back
        </button>
      </span>
      <section className="container wrapper-md">
        <header>
          <h1 className="p-40-semibold text-dark-100">{name}</h1>
          <div className="flex item-center gap-5">
            <InfoPill
              text={`${duration} day plan`}
              image="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={
                itinerary
                  ?.slice(0, 4)
                  .map((item) => item?.location)
                  .join(", ") || ""
              }
              image="/assets/icons/location-mark.svg"
            />
          </div>
        </header>
        <section className="gallery">
          {imageUrls.map((url: string, i: number) => (
            <img
              loading="lazy"
              decoding="async"
              src={url}
              key={i}
              className={cn(
                "w-full rounded-xl object-cover",
                i === 0
                  ? "md:col-span-2 md:row-span-2 h-[330px]"
                  : "md:row-span-1 h-[150px]"
              )}
            />
          ))}
        </section>
        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          <ChipListComponent id="travel-chip">
            <ChipsDirective>
              {pillItems?.map((pill, i) => (
                <ChipDirective
                  key={i}
                  text={getFirstWord(pill.text)}
                  cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                />
              ))}
            </ChipsDirective>
          </ChipListComponent>
          <ul className="flex gap-1 items-center">
            {Array(5)
              .fill("null")
              .map((__, index) => (
                <li key={index}>
                  <img
                    src="/assets/icons/star.svg"
                    alt="stat"
                    className="size-[18px]"
                  />
                </li>
              ))}
            <li className="ml-1">
              <ChipListComponent>
                <ChipsDirective>
                  <ChipDirective
                    text="4.9/5"
                    cssClass="!bg-yellow-50 !text-yellow-700"
                  />
                </ChipsDirective>
              </ChipListComponent>
            </li>
          </ul>
        </section>

        <section className="title">
          <article>
            <h3>
              {duration}-Day {country} {travelStyle} Trip
            </h3>
            <p>
              {budget}, {groupType} and {interests}
            </p>
          </article>
          <h2>{estimatedPrice}</h2>
        </section>
        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>
        <ul className="itinerary">
          {itinerary?.map((dayPlan: DayPlan, index: number) => (
            <li key={index}>
              <h3>
                Day{dayPlan.day} : {dayPlan.location}
              </h3>
              <ul>
                {dayPlan.activities.map((Activity, index) => (
                  <li key={index}>
                    <span className="sm:flex-shring-0 p-18-semibold">
                      {Activity.time}
                    </span>
                    <p className="flex-grow ">{Activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {visitTimeAndWeatherinfo.map((section) => (
          <section key={section.title} className="visit">
            <div>
              <h3>{section.title}</h3>
              <ul>
                {section.items?.map((item) => (
                  <li key={item}>
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>
        <div className="trip-grid">
          {allTrips?.map(
            ({
              id,
              name,
              imageUrls,
              itinerary,
              interests,
              travelStyle,
              estimatedPrice,
            }) => (
              <TripCard
                id={id}
                key={id}
                name={name}
                location={itinerary?.[0].location ?? ""}
                imageUrl={imageUrls[0]}
                tags={[interests, travelStyle]}
                price={estimatedPrice}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default TripDetail;
//dayPlan → represents the current object from the itinerary array. Each li represents a single day’s plan.
