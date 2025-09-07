import { FeaturedTrips } from "~/constants";
import {cn} from "lib/utils"
const FeatureTrips = () => {
  return (
    <section className="Featured xl:grid xl:grid-rows-3 ">
      {FeaturedTrips.map((item,i) => (
        <div key={i}
         className={cn( "w-full rounded-xl object-cover overflow-hidden h-[250px] relative contain-[layout-paint]",
            i===0
            ? "md:col-span-3 md:row-span-1 lg:col-span-4 lg:row-span-1 h-[300px]"// // wide banner
            : "md:[250px]",//normal card
            i===2 || i===3 ? "md:col-span-2! md:row-span-1!lg:col-span-2 lg:row-span-2 md:h-[250px]  lg:h-[460px]" // taller card
            : "h-[250px] ",
            i===5? "lg:h-[182px]":"",


          )} 
         >
          <img src={item.image}
           className="w-full h-full object-cover rounded-xl"
           loading="lazy"
           alt={item.name} decoding="async"/>
          <h1 >{item.name}</h1>
          <p>{item.Activities}</p>
          
        </div>
      ))}
    </section>
  );
};

export default FeatureTrips;
//w-full fixes this by making the image always fill the width of its parent container.