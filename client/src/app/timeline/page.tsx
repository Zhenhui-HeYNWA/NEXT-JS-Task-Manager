"use client";
import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery } from "@/state/api";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import Header from "@/components/Header";

type TaskTypeItems = "task" | "milestone" | "project";
const TimeLine = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [displayOption, setDisplayOption] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project?.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "Project" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOption((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects)
    return <div>An error occurred while fetching projects</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />

        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOption.viewMode}
            onChange={handleViewChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOption}
            columnWidth={displayOption.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="170px"
            projectBackgroundSelectedColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
