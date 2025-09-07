import { Link, redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useNavigate } from "react-router-dom";
import {  getTripById } from "~/appwrite/trips";


const welcome =() => {
  const navigate = useNavigate();
  
  
  return (
    <main className="welcome">
      <section className=" size-full glassmorphism flex-center px-6">
        <div className="sign-in-card">
          <header className="header flex-col " >
            <Link to="/">
              <img
                src="/assets/icons/check.svg"
                alt="welcome"
                className="size-[55px]"
              />
            </Link>
            <h1 className="p-28-bold text-dark-100">
              Welcome For Your Amazing Trip
            </h1>
          </header>

          <article>
            <h2 className="p-28-semibold text-dark-100 text-center">
              Start Your Travel Journey
            </h2>

            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Get Ready to Explore & make Memories with your Trips
            </p>
          </article>
<Link to={`/trips`}>
          <ButtonComponent
            type="button"
            className="button-class !h-11 !w-full text-white!">
           
          
            Go to Trip Details
          </ButtonComponent></Link>
        <Link to="/" >
          <h2
            className="p-18-semibold flex justify-center text-center text-gray-100 mt-5  "
            
          >
            <img
              src="/assets/icons/arrow-left.svg"
              alt="img"
              className="size-[20px] mr-2"
            />
            Return to HomePage
          </h2></Link>
        </div>
      </section>
    </main>
  );
};

export default welcome;




