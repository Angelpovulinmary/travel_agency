{
  /*Static values (routes, links, etc.) */
}
//Stores hard-coded values used throughout the app (e.g., URLs, roles, default values).
import type { AxisModel } from "@syncfusion/ej2-react-charts";
import { formatDate } from "lib/utils";
export const sidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 3,
    icon: "/assets/icons/users.svg",
    label: "All Users",
    href: "/AllUsers",
  },
  {
    id: 4,
    icon: "/assets/icons/itinerary.svg",
    label: "AI Trips",
    href: "/trips",
  },
];


export const chartOneData: object[] = [
  {
    x: "Jan",
    y1: 0.5,
    y2: 1.5,
    y3: 0.7,
  },
  {
    x: "Feb",
    y1: 0.8,
    y2: 1.2,
    y3: 0.9,
  },
  {
    x: "Mar",
    y1: 1.2,
    y2: 1.8,
    y3: 1.5,
  },
  {
    x: "Apr",
    y1: 1.5,
    y2: 2.0,
    y3: 1.8,
  },
  {
    x: "May",
    y1: 1.8,
    y2: 2.5,
    y3: 2.0,
  },
  {
    x: "Jun",
    y1: 2.0,
    y2: 2.8,
    y3: 2.5,
  },
];

export const travelStyles = [
  "Relaxed",
  "Luxury",
  "Adventure",
  "Cultural",
  "Nature & Outdoors",
  "City Exploration",
];

export const interests = [
  "Food & Culinary",
  "Historical Sites",
  "Hiking & Nature Walks",
  "Beaches & Water Activities",
  "Museums & Art",
  "Nightlife & Bars",
  "Photography Spots",
  "Shopping",
  "Local Experiences",
];

export const budgetOptions = ["Budget", "Mid-range", "Luxury", "Premium"];

export const groupTypes = ["Solo", "Couple", "Family", "Friends", "Business"];

export const footers = ["Terms & Condition", "Privacy Policy"];
{
  /*“An array where every element must be one of the keys of TripFormData.”
keyof TripFormData means: “Only allow keys that exist in TripFormData”*/
}
export const selectItems = [
  "groupType",
  "travelStyle",
  "interests",
  "budget",
] as (keyof TripFormData)[];
// actual data for each key.Each key points to the options you want to show in the dropdown.
export const comboBoxItems = {
  groupType: groupTypes,
  travelStyle: travelStyles,
  interests: interests,
  budget: budgetOptions,
} as Record<keyof TripFormData, string[]>;
//An object whose keys are all the keys of TripFormData, and each value is an array of strings.”
export const userXAxis: AxisModel = { valueType: "Category", title: "Day" };
export const useryAxis: AxisModel = {
  minimum: 0,
  maximum: 10,
  interval: 2,
  title: "Count",
};

export const tripXAxis: AxisModel = {
  valueType: "Category",
  title: "Travel Styles",
  majorGridLines: { width: 0 },//removes vertical grid lines from the background.
};

export const tripyAxis: AxisModel = {
  minimum: 0,
  maximum: 10,
  interval: 2,
  title: "Count",
};

export const CONFETTI_SETTINGS = {
  particleCount: 200, // Number of confetti pieces
  spread: 60, // Spread of the confetti burst
  colors: ["#ff0", "#ff7f00", "#ff0044", "#4c94f4", "#f4f4f4"], // Confetti colors
  decay: 0.95, // Gravity decay of the confetti
};

export const LEFT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 45, // Direction of the confetti burst (90 degrees is top)
  origin: { x: 0, y: 1 }, // Center of the screen
};

export const RIGHT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 135,
  origin: { x: 1, y: 1 },
};
export const user = {
  name: "Angel",
};
export const dashboardStats = {
  totalUsers: 12450,
  usersJoined: { currentMonth: 218, lastMonth: 176 },
  totalTrips: 3210,
  tripsCreated: { currentMonth: 150, lastMonth: 250 },
  userRole: { total: 62, currentMonth: 25, lastMonth: 15 },
};
export const allTrips = [
  {
    id: 1,
    name: "Barcelona Tour",
    imageUrls: ["/assets/images/card-img-1.png"],
    itinerary: [{ location: "Thailand" }],
    tags: ["Adventure", "Culture"],
    travelStyle: "Solo",
    estimatedPrice: "$1,000",
  },
  {
    id: 2,
    name: "French Reverie",
    imageUrls: ["/assets/images/sample2.jpg"],
    itinerary: [{ location: "Paris" }],
    tags: ["Relaxation", "Culinary"],
    travelStyle: "Family",
    estimatedPrice: "$2,000",
  },
  {
    id: 3,
    name: "Zen Break",
    imageUrls: ["/assets/images/sample3.jpg"],
    itinerary: [{ location: "Japan" }],
    tags: ["Shopping", "Luxury"],
    travelStyle: "Couple",
    estimatedPrice: "$3,000",
  },
  {
    id: 4,
    name: "Adventure in Westeros",
    imageUrls: ["/assets/images/sample4.jpg"],
    itinerary: [{ location: "Croatia" }],
    tags: ["Historical", "Culture"],
    travelStyle: "Friends",
    estimatedPrice: "$4,000",
  },
];
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    imageUrl: "/assets/images/david.webp",
    dateJoined: formatDate("2025-01-01"),
    itineraryCreated: 10,
    status: "user",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    imageUrl: "/assets/images/david.webp",
    dateJoined: formatDate("2025-01-02"),
    itineraryCreated: 4,
    status: "user",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@example.com",
    imageUrl: "/assets/images/david.webp",
    dateJoined: formatDate("2025-01-03"),
    itineraryCreated: 8,
    status: "admin",
  },
];
export const FeaturedTrips=[{
  id:0,
  name:"Barcelona Tour",
  Activities:"96 Activities",
  image:"/assets/images/card-img-1.webp"
},
{
  id:1,
  name:"Australia Tour",
  Activities:"101 Activities",
  image:"/assets/images/card-img-4.webp"
},
{
  id:2,
  name:"London,united state Tour",
  Activities:"87 Activities",
  image:"/assets/images/card-img-2.webp"
},
{
  id:3,
  name:"Australia Tour",
  Activities:"103 Activities",
  image:"/assets/images/card-img-3.webp"
},
{
  id:4,
  name:"Japan Tour",
  Activities:"95 Activities",
  image:"/assets/images/card-img-5.webp"
},
{
  id:5,
  name:"japan Tour",
  Activities:"146 Activities",
  image:"/assets/images/card-img-6.webp"
},
]

{
  /*[User Types in Dropdown Search Box]
        |
        v
---------------------------------------
Step 1: filtering={(e) => { ... }} fires
---------------------------------------
        |
        v
 query = e.text.toLowerCase()
 e.text = "an"
 query = "an"
        |
        v
---------------------------------------
Step 2: Filter the countries array
---------------------------------------
countries.filter(country =>
    country.name.toLowerCase().includes(query)
)

 Original countries:
   1. India    -> "india"   includes "an"? ❌ No
   2. France   -> "france"  includes "an"? ✅ Yes
   3. Canada   -> "canada"  includes "an"? ✅ Yes

 Filter result:
   [
     { name: "France", value: "FR" },
     { name: "Canada", value: "CA" }
   ]
        |
        v
---------------------------------------
Step 3: Map into dropdown's required format
---------------------------------------
.map(country => ({
   text: country.name,
   value: country.value
}))

 Result:
   [
     { text: "France", value: "FR" },
     { text: "Canada", value: "CA" }
   ]
        |
        v
---------------------------------------
Step 4: e.updateData(filteredArray)
---------------------------------------
e.updateData([
   { text: "France", value: "FR" },
   { text: "Canada", value: "CA" }
])

 ✅ Dropdown now shows only "France" and "Canada"
*/
}
//coordinates
{
  /*"coordinates": [
  [
    [61.21081709172573, 35.650072333309218]
  ]]
1.21081709172573 → Longitude (East-West position).

35.650072333309218 → Latitude (North-South position).

These points connect in order to draw the country’s border.
"Polygon" → A closed shape (like a country’s border).*/
}
