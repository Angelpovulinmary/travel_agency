//These are not full pages, just parts that you use inside pages in components folder.This is where you keep reusable parts of UI.
//Reusable UI pieces like headers, buttons, sidebars, etc.not specific to any single feature
{
  /*Reusable header */
}
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { cn } from "../lib/utils";
import { useLocation } from "react-router";
import { Link } from "react-router";
interface Props {
  title: string;
  description: string;
  ctaText?: string;
  cTaUrl?: string;
}
const Header = ({ title, description, ctaText, cTaUrl }: Props) => {
  const location = useLocation();
  return (
    <header className="header contain-[layout-paint]">
      <article>
        <h1
          className={cn(
            "text-dark-100",
            location.pathname === "/"
              ? "text-2xl md:text-4xl font-bold"
              : "text-xl md:text-2xl font-semibold"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-gray-100 font-normal",
            location.pathname === "/"
              ? "text-base md:text-lg"
              : "text-sm md:text-lg"
          )}
        >
          {description}
        </p>
      </article>
      {ctaText && cTaUrl && (
        <Link to={cTaUrl}>
          <ButtonComponent
            type="button"
            className="button-class !h-11 !w-full md:w-[240px]"
          >
            <img src="/assets/icons/plus.svg" alt="plus" className="size-5" />
            <span className="p-16-semibold text-white">{ctaText}</span>
          </ButtonComponent>
        </Link>
      )}
    </header>
  );
};

export default Header;
