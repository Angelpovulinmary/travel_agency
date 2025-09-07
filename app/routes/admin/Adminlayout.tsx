{
  /* Layout for admin pages*/
}
import { Suspense } from "react";
import { MobileSidebar, NavItems } from "../../../components";
import { Outlet } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { redirect } from "react-router";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) return redirect("/SignIn");

    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.status === "user") {
      return redirect("/");
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (e) {
    console.log("Error in clientLoader", e);
    return redirect("/SignIn");
  }
}
const Adminlayout = () => {
  return (
    <div className="admin-layout  ">
      {/* Mobile sidebar */}

      <MobileSidebar />

      {/* Desktop sidebar (left panel) */}
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false} className="contain:[layout-paint]">
          <NavItems />
        </SidebarComponent>
       {/* <NavItems />*/}
      </aside>
      {/* Main content area */}
      <Suspense fallback={<div>Loading...</div>}>
      <main className="children">
        <Outlet />
      </main>
        </Suspense>
    </div>
  );
};

export default Adminlayout;
