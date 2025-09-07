{
  /*Page: list of users */
}

import Header from "../../../components/Header";
import {
  GridComponent,
  ColumnDirective,
  ColumnsDirective,
} from "@syncfusion/ej2-react-grids";

import { cn, formatDate } from "../../../lib/utils";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/AllUsers";
import { useNavigate } from "react-router";
export const loader = async () => {
  const { users, total } = await getAllUsers(10, 0);
  return { users, total };
};

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  const { users } = loaderData;
  const navigate=useNavigate();

  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter,sort,and access detailed user profiles"
      />
        <span className=" absolute md:right-10 right-10 ">
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          className="cursor-pointer p-24-semibold button-class-secondary p-4"
        >
          <img
            src="/assets/icons/arrow-left.svg"
            alt="logout"
            className="size-6 md:size-8"
          />
          Go Back
        </button>
      </span>
      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            //  it receives an argument props of type UserData.
            //template is a prop of ColumnDirective component
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 px-4">
                <img
                  src={props?.imageUrl}
                  alt="user"
                  className="rounded-full size-8 aspect-square"
                />
                <span>{props?.name||'User'}</span>
              </div>
            )}
          />
          <ColumnDirective
            field="email"
            headerText="Email Address"
            width="200"
            textAlign="Left"
          />
          <ColumnDirective
            field="JoinedAt"
            headerText="Date Joined"
            width="120"
            textAlign="Left"
            template={({ joinedAt }: { joinedAt: string }) =>
              formatDate(joinedAt)
            }
          />

          <ColumnDirective
            field="status"
            headerText="Status"
            width="100"
            textAlign="Left"
            template={({ status }: UserData) => (
              <article
                className={cn(
                  "status-column",
                  status === "user" ? "bg-success-50" : "bg-light-300"
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    status === "user" ? "bg-success-500" : "bg-gray-500"
                  )}
                />
                <h3
                  className={cn(
                    "font-inter text-xs font-medium",
                    status === "user" ? "text-success-700" : "text-gray-500"
                  )}
                >
                  {status}
                </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default AllUsers;
