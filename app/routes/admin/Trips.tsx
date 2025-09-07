import { getAllTrips, getTripById } from "~/appwrite/trips";
import { Header, TripCard } from "../../../components";
import type { Route } from "./+types/Trips";
import type { LoaderFunctionArgs } from "react-router";
import { parseTripData } from "lib/utils";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { PagerComponent } from "@syncfusion/ej2-react-grids";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;
  const { allTrips, total } = await getAllTrips(limit, offset);

  return {
    trips: allTrips.map(({ $id, tripDetails, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetails), //we can parse all of details
      imageUrls: imageUrls ?? [],
    })),
    total,
  };
};
const Trips = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData.trips as Trip[] | [];
  const [searchParams, setsearchParams] = useSearchParams();
  const initialpage = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialpage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setsearchParams({ page: page.toString() });
  };

  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="view and edit AI-generated trips"
        ctaText="Create a Trip"
        cTaUrl="/trips/create"
      />
      <section className="containt-[layout-paint]">
        <h1 className="p-24-semibold text-dark-200 mb-6">
          Manage Created Trips{" "}
        </h1>
        <div className="trip-grid mb-4">
          {trips?.map(
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
            ) // for each trip ,we render a trip card
          )}
        </div>
        <div className="flex justify-center text-center">
          <PagerComponent
            totalRecordsCount={loaderData?.total}
            pageSize={8} //show 8 elem per page
            currentPage={currentPage}
            click={(args) => handlePageChange(args.currentPage)}
            cssClass="mb-4"
          />
        </div>
      </section>
    </main>
  );
};

export default Trips;
