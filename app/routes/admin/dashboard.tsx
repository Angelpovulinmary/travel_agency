{
  /* Admin dashboard page */
}

import { Header, StatsCard, TripCard } from "../../../components";
import { useNavigate } from "react-router";
import { logoutUser } from "~/appwrite/auth";
import { getAllUsers, getUser } from "~/appwrite/auth";
import type { Route } from "./+types/dashboard";
import {
  getTripsByTravelStyle,
  getUserGrowthPerDay,
  getUsersAndTripStats,
} from "~/appwrite/dashboard";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "lib/utils";

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
} from "@syncfusion/ej2-react-grids";
import {
  ChartComponent,
  Category,
  DataLabel,
  SplineAreaSeries,
  Tooltip,
  ColumnSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Legend,
} from "@syncfusion/ej2-react-charts";
import { tripXAxis, tripyAxis, userXAxis, useryAxis } from "~/constants";
export const clientLoader = async () => {
  const [
    user,
    dashboardStats,
    trips,
    userGrowth,
    tripsByTravelStyle,
    allUsers,
  ] = await Promise.all([
    getUser(),
    getUsersAndTripStats(),
    getAllTrips(4, 0), //we render it within cards
    getUserGrowthPerDay(),
    getTripsByTravelStyle(),
    getAllUsers(4, 0),
  ]);
  const allTrips = trips.allTrips.map(({ $id, tripDetails, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetails), //we can parse all of details
    imageUrls: imageUrls ?? [],
  }));
  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user) => ({
    imageUrl: user?.imageurl,
    name: user?.name,
    count: user?.itineraryCount ?? Math.floor(Math.random() * 10),
  }));
  return {
    user,
    dashboardStats,
    allTrips,
    userGrowth,
    tripsByTravelStyle,
    allUsers: mappedUsers,
  }; //we return all of them from the client loader , extract real data and bring it into this page
};

const dashboard = ({ loaderData }: Route.ComponentProps) => {
  //const user =  (loaderData as  User|null) ?? null;
  const user = loaderData.user as User | null;
  const { allTrips, userGrowth, tripsByTravelStyle, allUsers, dashboardStats } =
    loaderData;
  const trips = allTrips?.map((trip) => ({
    imageUrl: trip?.imageUrls[0],
    name: trip?.name,
    interest: trip?.interests,
  }));
  //console.log('trips:',trips)

  const usersAndTrips = [
    {
      title: "Latest User Sighup",
      dataSource: allUsers,
      Field: "count",
      headerText: "Trips Created",
    },
    {
      title: "Trips based on interests",
      dataSource: trips,
      Field: "interest",
      headerText: "Interests",
    },
  ];
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    navigate("/SignIn");
  };

  return (
    <main className="dashboard wrapper">
      <Header
        title={`welcome ${user?.name ?? "guest"}`}
        description="track Activity,trends, and popular destinations in real time"
      />
      <span className=" absolute right-3 md:right-10">
        <button
          onClick={handleLogout}
          className="cursor-pointer p-24-semibold  flex flex-row gap-2"
        >
          <img
            src="/assets/icons/logout.svg"
            alt="logout"
            className="size-6 md:size-8 "
          />
          Logout
        </button>
      </span>
      <section className="w-full flex flex-col gap-6 containt-[layout-paint]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats?.totalUsers}
            currentMonthCount={dashboardStats?.usersJoined.currentMonth}
            lastMonthCount={dashboardStats?.usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats?.totalTrips}
            currentMonthCount={dashboardStats?.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats?.tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={dashboardStats?.userRole.total}
            currentMonthCount={dashboardStats?.userRole.currentMonth}
            lastMonthCount={dashboardStats?.userRole.lastMonth}
          />
        </div>
      </section>
      <section className="container contain-[layout-paint]">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

        <div className="trip-grid">
          {allTrips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id.toString()}
              name={trip.name!}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
              tags={[trip.interests!, trip.travelStyle!]}
              price={trip.estimatedPrice!}
            />
          ))}
        </div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 contain-[layout-paint]">
     
        <ChartComponent
          id="chart-1"
          primaryXAxis={userXAxis}
          primaryYAxis={useryAxis}
          title="User Growth"
          tooltip={{ enable: true }}
        >
          <Inject
            services={[
              ColumnSeries,
              SplineAreaSeries,
              Category,
              DataLabel,
              Tooltip,
              Legend,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="Column"
              name="User"
              columnWidth={0.3} // values width in each coloumn
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />
            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="SplineArea"
              name="wave"
              fill="rgba(71,132,238,0.3)"
              border={{ width: 2, color: "#4784EE" }} //you better track the trend
              columnWidth={0.3} // values width in each coloumn
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
        <ChartComponent
          id="chart-2"
          primaryXAxis={tripXAxis}
          primaryYAxis={tripyAxis}
          title="Trip Trends"
          tooltip={{ enable: true }} //when we hover on each coloumn, it shows the exact count
        >
          <Inject
            services={[
              ColumnSeries, //Tool to draw bar/column charts (vertical rectangles)
              SplineAreaSeries,
              Category,
              DataLabel,
              Tooltip,
              Legend,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={tripsByTravelStyle} //track trip trends
              xName="travelStyle"
              yName="count"
              type="Column"
              name="Trip"
              columnWidth={0.3} // values width in each coloumn
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </section>
      <section className="user-trip wrapper contain-[layout-paint]">
        {usersAndTrips.map(({ title, dataSource, Field, headerText }, i) => (
          <div key={i} className="flex flex-col gap-5">
            <h3 className="p-20-semibold text-dark-100">{title}</h3>
            <GridComponent dataSource={dataSource} gridLines="None">
              <ColumnsDirective>
                <ColumnDirective
                  field="name"
                  headerText="Name"
                  width="200"
                  textAlign="Left"
                  //  it receives an argument props of type UserData.
                  //template is a prop of ColumnDirective component
                  template={(props: UserData) => (
                    <div className="flex items-center gap-1.5 px-4">
                      <img
                        src={props?.imageUrl}
                        alt="user"
                        className="rounded-full size-8 aspect-square"
                      />
                      <span>{props?.name}</span>
                    </div>
                  )}
                />
                <ColumnDirective
                  field={Field}
                  headerText={headerText}
                  width="150"
                  textAlign="Left"
                />
              </ColumnsDirective>
            </GridComponent>
          </div>
        ))}
      </section>
    </main>
  );
};

export default dashboard;
{
  /*SplineAreaSeries- 🌊
Tool to draw smooth curved line areas (like a mountain filled with color).
Example: If you want to show growth trend over time, this creates a smooth wave-like chart.
Category- 🏷️
Tells the chart that the x-axis values are categories (like “Jan, Feb, Mar”) instead of numbers.
Tooltip- 💬
When you hover on a bar/point, it shows a popup box with details.
Example: Hover over “Feb bar” → tooltip says “Feb: 200 users”.
Legend = the chart’s explanation box that tells what each color/line/bar represents in charts
name-It is used in the legend (the colored key box that tells which data belongs to which series).
📊🔵 Trips 🟢 Users
The legend helps you understand which bars are which.
type="Column"
This tells the chart how to draw the series.
It could be:
"Column" → vertical bars 📊
"Line" → line chart 📈
"SplineArea" → smooth area 🌊
"Pie" → pie slices 🥧
Without type, the chart doesn’t know the style to draw.
*/
}
