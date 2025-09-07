import { database, appwriteConfig } from "~/appwrite/client";
import { parseTripData } from "../../lib/utils";
interface Document {
  [key: string]: any;
}
type FilterByDate = (
  items: Document[], //takes an array of documents like user or trip
  key: string, //should contain a date (e.g., "joinedAt", "createdAt"),
  start: string,
  end?: string
) => number; //returns the number of items that were created between start and end dates
export const getUsersAndTripStats = async (): Promise<DashboardStats> => {
  const d = new Date();
  const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
  //get first day of the current month
  const startPrev = new Date(
    d.getFullYear(),
    d.getMonth() - 1,
    1
  ).toISOString();
  //start of previous month
  const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();
  //end of previous month

  const [users, trips] = await Promise.all([
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    ),
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId
    ),
  ]);

  const filterByDate: FilterByDate = (items, key, start, end) =>
    items.filter((item) => item[key] >= start && (!end || item[key] <= end))
      .length;

  const filterUsersByRole = (role: string) => {
    return users.documents.filter((u: Document) => u.status === role);
  };
  return {
    totalUsers: users.total,
    usersJoined: {
      // we want to know how many users joined in the current month and last month that have a role of user
      currentMonth: filterByDate(
        users.documents,
        "joinedAt",
        startCurrent,
        undefined
      ),

      lastMonth: filterByDate(users.documents, "joinedAt", startPrev, endPrev),
    },
    //filter it based on user and admin
    userRole: {
      total: filterUsersByRole("user").length, //next step we pass amount of users
      currentMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startCurrent,
        undefined
      ),
      //
      lastMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startPrev,
        endPrev
      ),
    },
    totalTrips: trips.total,
    tripsCreated: {
      //we filter trip by date and get trip documents
      currentMonth: filterByDate(
        trips.documents,
        "createdAt",
        startCurrent,
        undefined
      ),

      lastMonth: filterByDate(trips.documents, "createdAt", startPrev, endPrev),
    },
  };
};
export const getUserGrowthPerDay = async () => {
  const users = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId
  );

  const userGrowth = users.documents.reduce(
    (acc: { [key: string]: number }, user: Document) => {
      const date = new Date(user.joinedAt);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {}
  );
  [{count:1,day:1}]

  return Object.entries(userGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};{/*useful when you have a chart that has a day and count attached to each day*/}

export const getTripsCreatedPerDay = async () => {
  const trips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripCollectionId
  );

  const tripsGrowth = trips.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const date = new Date(trip.createdAt);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(tripsGrowth).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};

export const getTripsByTravelStyle = async () => {
  const trips = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.tripCollectionId
  );

  const travelStyleCounts = trips.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const tripDetail = parseTripData(trip.tripDetails);

      if (tripDetail && tripDetail.travelStyle) {
        const travelStyle = tripDetail.travelStyle;
        acc[travelStyle] = (acc[travelStyle] || 0) + 1;
      }
      return acc;
    },
    {}
  );
  return Object.entries(travelStyleCounts).map(([travelStyle, count]) => ({
 count: Number(count),
  travelStyle,}));
};
{/*const fruit = "Apple";
// Both give same result
{ fruit: fruit }  // → { fruit: "Apple" }
{ fruit }         // → { fruit: "Apple" }
*/}