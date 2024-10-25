import { Project } from "@/state/api";
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarCheck, CalendarPlus } from "lucide-react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  const projectDescription = project.description || "";
  const isLongContent = projectDescription.length > 30;

  return (
    <div className="my-2 flex flex-col gap-4 rounded border-t-8 border-[#ECB950] px-6 py-4 shadow dark:bg-[#1E1E1E] dark:text-white">
      <span className="flex items-center justify-start gap-2 text-gray-500">
        <CalendarPlus size={16} />
        {project.startDate
          ? format(new Date(project.startDate), "P")
          : "Not set"}
      </span>
      <h3 className="flex items-center gap-2">
        <p className="text-[18px] font-bold">{project.name}</p>
      </h3>

      <span className="flex gap-1">
        <strong>Description:</strong>
        <p className="text-gray-500">
          {isLongContent && !isExpanded
            ? `${projectDescription.slice(0, 30)}...`
            : projectDescription}
          {isLongContent && (
            <button
              onClick={toggleExpansion}
              className="text-blue-500 underline"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </p>
      </span>

      <span className="flex items-center gap-2 text-gray-500">
        <CalendarCheck size={16} />
        {project.endDate ? format(new Date(project.endDate), "P") : "Not set"}
      </span>
    </div>
  );
};

export default ProjectCard;
