"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";

import React, { useEffect, useState } from "react";

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    // skip the req if the searchTerm is less than 3 letters
    skip: searchTerm.length < 3,
  });

  // Debounced search handler
  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500, // 500ms delay
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow outline-lime-400"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error Occurred While fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div className="">
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h1 className="text-xl font-extrabold dark:text-white">Tasks:</h1>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-3">
              {searchResults.tasks?.map((task) => (
                <div
                  key={task.id}
                  className="my-4 w-96 items-center justify-center"
                >
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
            {/* Project */}
            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2 className="text-xl font-extrabold dark:text-white">
                Projects:
              </h2>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {searchResults.projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            {/* User */}{" "}
            <div className="">
              {searchResults.users && searchResults.users?.length > 0 && (
                <h2 className="text-xl font-extrabold dark:text-white">
                  Users:
                </h2>
              )}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {searchResults.users?.map((user) => (
                  <UserCard key={user.userId} user={user} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
