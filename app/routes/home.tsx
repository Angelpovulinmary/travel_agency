import { MobileSidebar,NavItems } from "components"
import { SidebarComponent } from "@syncfusion/ej2-react-navigations"

{/* Page: homepage or fallback */}
const Home = () => {
  return (
   <div className="admin-layout  ">
      {/* Mobile sidebar */}

      <MobileSidebar />

      {/* Desktop sidebar (left panel) */}
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
        <NavItems />
      </aside>
      </div>
  )
}

export default Home