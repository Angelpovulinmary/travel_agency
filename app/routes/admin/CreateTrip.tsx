//Page to create a new trip
import Header from "../../../components/Header";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import type { Route } from "./+types/CreateTrip";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "lib/utils";
import { useEffect, useState } from "react";
import {
  LayersDirective,
  LayerDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";

import { useNavigate } from "react-router-dom";


export const loader = async () => {
  try {
    const response = await fetch("https://www.apicountries.com/countries");

    const data = await response.json();
    // console.log(data)

    return data.map((country: any) => ({
      name: `${country?.name}`,
      coordinates: country?.latlng,
      value: country?.name,
      openStreetMap: country.maps?.openStreetMap,
    }));
  } catch (error) {
    console.log("Error fetching users", error);
  }
};

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[];
  const navigate = useNavigate();
  const [formData, setFormdata] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "",
    interests: "",
    budget: "",
    duration: 0,
    groupType: "", //all of the information that we need to generate a proper travel
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.interests ||
      !formData.budget ||
      !formData.groupType
    ) {
      setError("Please Provide values");
      setLoading(false);
      return;
    }
    if (formData.duration < 1 || formData.duration > 20) {
      setError("Duration must be between 1 and 20 days");
      setLoading(false);
      return;
    }
    const user = await account.get();
    if (!user.$id) {
      console.log("message:", "User not authenticated");
      setLoading(false);
      return;
    }

     try{
     const response = await fetch("/api/CreateTrip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: formData?.country,
          numberOfDays: formData?.duration,
          travelStyle: formData?.travelStyle,
          interests: formData?.interests,
          budget: formData?.budget,
          groupType: formData?.groupType,
          userId: user?.$id,
        }),
      });
      console.log("res:", response);
      // Check the response status and content type
      if (!response.ok) {
        const errorText = await response.text(); // Get the raw response text
        console.error("API Error:", response.status, errorText);
        // Handle non-OK responses appropriately (e.g., show an error message to the user)
        return;
      }

      const result: CreateTripResponse = await response.json();

   if (result?.id){navigate('/welcome');}//(`/trips/${result.id}`);
      else console.error("Failed to generate a trip");
    } catch (e) {
      console.error("message:", "Error generating trip", e);
    } finally {
      setLoading(false); //whether they are succesfully or not
    }
  };
  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormdata({ ...formData, [key]: value });
  };
  //console.log( countries);
  useEffect(() => console.log("hello hii"), [error]);

  const countryData = countries?.map((country: any) => ({
    text: country?.name,
    value: country?.value,
  }));
  const mapData = [
    {
      country: formData?.country,
      color: "EA382E",
      coordinates:
        countries?.find((c: Country) => c.name === formData.country)
          ?.coordinates || [],
    },
  ];
  // Handle form submission logic here

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip "
        description="View and Edit Ai Generated travel plans"
      />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              placeholder="select a country"
              fields={{ text: "text", value: "value" }}
              className="combo-box"
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                  // console.log(e.value)
                }
              }}
              //Enables or allowing search or filtering functionality inside the dropdown list.
              allowFiltering
              //Custom logic for how the search filtering is applied when the user types in the dropdown
              filtering={(e) => {
                const query = e.text.toLowerCase();
                //console.log(e.text);
                {
                  /*Filter the list of countries by matching the search text.e.updateData to update the dropdown options with the filtered result.
  Convert each country into an object format expected by the dropdown.*/
                }
                e.updateData(
                  countries
                    .filter((country) =>
                      country.name.toLowerCase().includes(query)
                    )
                    .map((country) => ({
                      text: country.name,
                      value: country.value,
                    }))
                );
              }}
            />
          </div>
          <div>
            <label htmlFor="duration" >duration</label>
            <input
              id="duration"
              type="number"
              name="duration"
              placeholder="Enter a number of days"
              className="form-input placeholder:text-gray-100"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
            {selectItems.map((key) => (
              <div key={key}>
                <label htmlFor={key}>{formatKey(key)}</label>
                <ComboBoxComponent
                  id={key}
                  dataSource={(comboBoxItems[key] || []).map((item) => ({
                    text: item,
                    value: item,
                  }))}
                  placeholder={`Select ${formatKey(key)}`}
                  fields={{ text: "text", value: "value" }}
                  className="combo-box"
                  change={(e: { value: string | undefined }) => {
                    if (e.value) {
                      handleChange(key, e.value);
                      //console.log(e.value)
                      //console.log(e)
                    }
                  }}
                  //Enables or allowing search or filtering functionality inside the dropdown list.
                  allowFiltering
                  //Custom logic for how the search filtering is applied when the user types in the dropdown
                  filtering={(e) => {
                    const query = e.text.toLowerCase();
                    console.log(e.text); // track the key press event
                    {
                      /*Filter the list of countries by matching the search text.e.updateData to update the dropdown options with the filtered result.
  Convert each country into an object format expected by the dropdown.*/
                    }
                    e.updateData(
                      comboBoxItems[key]
                        .filter((item) => item.toLowerCase().includes(query))
                        ?.map((item) => ({
                          text: item,
                          value: item,
                        }))
                    );
                  }}
                />
              </div>
            ))}
            <div>
              <label htmlFor="location">Location on the world map</label>
              <MapsComponent>
                <LayersDirective>
                  <LayerDirective
                    dataSource={mapData}
                    shapeData={world_map}
                    shapePropertyPath="name" // Syncfusion will look in each properties object for the "name" key in world mapf file
                    shapeDataPath="country"
                    shapeSettings={{ colorValuePath: "color", fill: "#e5e5e5" }}
                  ></LayerDirective>
                </LayersDirective>
              </MapsComponent>
            </div>
          </div>
          <div className="bg-gray-200 h-px w-full" />
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${
                  loading ? "loader.svg" : "magic-star.svg"
                }`}
                className={cn("size-5", { "animate-spin": loading })}
              />
              <span className="p-16-semibold text-white">
                {loading ? "Generating..." : "GenerateTrip"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
