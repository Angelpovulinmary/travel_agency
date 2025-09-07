import { useNavigate } from "react-router";
import { logoutUser } from "~/appwrite/auth";
import { Link } from "react-router";

import FeatureTrips from "components/FeatureTrips";

const PageLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/SignIn");
  };
  return (
    <>
      <main className="travel-hero overflow-hidden">
        <div className=" pl-12 ">
          <header className="flex items-center  gap-3 mt-10">
            <Link to="/">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="size-[30px]"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
            <span className=" absolute right-10 p-5">
              
            

            <button onClick={handleLogout} className="cursor-pointer p-24-semibold md:text-white flex flex-row gap-2">
              <img
                src="/assets/icons/logout.svg"
                alt="logout"
                className="size-6 md:size-8"
              />
           Logout </button> </span>
          </header>
          <section>
            <article>
              <h1 className="p-72-bold">Plan Your Trip With Ease</h1>
              <p>
                Customize your travel itinerary in minutes - pick your
                destinations.set your preference and explore with confience
              </p>
              <Link to="/dashboard">
              <button
                className="bg-primary-100 text-white rounded-lg w-[170px] px-10 py-4 cursor-pointer flex gap-2.5 text-lg"
                
              >
                <span>Get</span>
                <span>Started</span>
              </button></Link>
            </article>
          </section>

          <button onClick={handleLogout} className="cursor-pointer">
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="size-6"
            />
          </button>
        </div>
      </main>
      <section className="m-10 ">
        <div className="flex flex-col gap-7  my-7">
          <h1 className="p-28-bold">Featured Travel Destinations</h1>
          <p className="p-28-semibold">
            Check out some of the best pieces you can visit around the world
          </p>
        </div>
        <FeatureTrips />
      </section>
    </>
  );
};

export default PageLayout;
