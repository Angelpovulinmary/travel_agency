{
  /* Route definitions (using `useRoutes`)*/
}
//route(path,file)
import {
  type RouteConfig,
  route,
  layout,
  index,
} from "@react-router/dev/routes";





export default [
  route("SignIn", "routes/root/SignIn.tsx"),
  route("/", "routes/root/PageLayout.tsx"),
  route("api/CreateTrip", "routes/api/CreateTrip.ts"),
  route("welcome", "routes/root/welcome.tsx"),
  layout("routes/admin/Adminlayout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),

    route("AllUsers", "routes/admin/AllUsers.tsx"),
    route("trips", "routes/admin/Trips.tsx"),
    route("trips/create", "routes/admin/CreateTrip.tsx"),
    route("trips/:tripId", "routes/admin/TripDetail.tsx"),
  ]),
  
] satisfies RouteConfig;
{
  /*-When the user navigates to /SignIn, it loads the component from
"routes/root/SignIn.tsx".
Basically: path → file/component.
-layout("routes/root/PageLayout.tsx", [index(...)])
This means → use the file PageLayout.tsx as a wrapper (layout component) for its child routes.A layout is typically something like a shared Navbar, Sidebar, or Footer that wraps around the child pages.
Meaning: when the user visits /, the page that loads by default is TravelPage.tsx.
routes/ folder → keeps all route-related files in one place.
root/ = specifically the root route (/) and its children.
React Router doesn’t require this, it’s just clean project organization.
*/
}
//drawback
{
  /*src/routes/
 ├─ PageLayout.tsx
 ├─ TravelPage.tsx
 └─ AboutPage.tsx 
That works fine. But as your app grows (nested routes, admin routes, auth routes…), grouping into folders like root/, admin/, auth/ makes it easier to maintain.*/
}
