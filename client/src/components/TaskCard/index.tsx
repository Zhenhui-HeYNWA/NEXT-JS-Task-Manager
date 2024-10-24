import { Task } from "@/state/api";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronsDown,
  ChevronsDownUp,
  ChevronsUp,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";

type Props = {
  task: Task;
};

// const statusColor: any = {
//   "To Do": "#92c3e3",
//   "Work In Progress": "#90e7cb",
//   "Under Review": "#d2a066",
//   Completed: "#565252a8",
// };
// const statusText: any = {
//   "To Do": "text-blue-700",
//   "Work In Progress": "text-green-700",
//   "Under Review": "text-orange-700",
//   Completed: "text-gray-900",
// };

// const priorityLogo: any = {
//   Urgent: <ChevronsUp className="h-6 w-6 text-red-500" />,
//   High: <ChevronUp className="h-6 w-6 text-orange-500" />,
//   Medium: <ChevronsDownUp className="text h-6 w-6 text-yellow-300" />,
//   Low: <ChevronDown className="h-6 w-6 text-emerald-400" />,
//   Backlog: <ChevronsDown className="h-6 w-6 text-green-900" />,
// };
const statusColor: any = {
  "To Do": "bg-gray-200 text-black dark:bg-[#31393F] dark:text-[#B5C2CF] ",
  "Work In Progress":
    "bg-[#0B65E4] text-white dark:bg-[#579DFF] dark:text-[#1D2125]",
  Completed: "bg-[#20845A] text-white dark:bg-[#4bce97] dark:text-[#1D2125]",
  "Under Review": "bg-[#d2a066] dark:text-orange-900 text-yellow-50",
};
const statusBorderColor: any = {
  "To Do": "border-gray-200 dark:border-[#31393F]  ",
  "Work In Progress": "border-[#0B65E4]  dark:border-[#579DFF] ",
  Completed: "border-[#20845A] dark:border-[#4bce97]",
  "Under Review": "border-[#d2a066] ",
};

const priorityLogo: any = {
  Urgent: <ChevronsUp className="h-6 w-6 text-red-500" />,
  High: <ChevronUp className="h-6 w-6 text-orange-500" />,
  Medium: <ChevronsDownUp className="text h-6 w-6 text-yellow-300" />,
  Low: <ChevronDown className="h-6 w-6 text-emerald-400" />,
  Backlog: <ChevronsDown className="h-6 w-6 text-green-900" />,
};
const TaskCard = ({ task }: Props) => {
  // const taskStatusColor = statusColor[task.status ?? "To Do"];
  // const StatusTextColor = statusText[task.status ?? "To Do"];
  const renderStatusStyle = statusColor[task?.status ?? "To Do"];
  const renderBorderColor = statusBorderColor[task?.status ?? "To Do"];
  return (
    <div
      className={`flex w-full gap-2 rounded-md border ${renderBorderColor} shadow-md`}
      // Apply dynamic border color
    >
      <div
        className={`h-full w-5 rounded-s ${renderStatusStyle} border ${renderBorderColor}`}
      />
      <div className="mb-3 w-full rounded-md bg-white dark:bg-dark-secondary dark:text-white">
        {task.attachments && task.attachments.length > 0 && (
          <div>
            <strong>Attachments:</strong>
            <div className="flex flex-wrap">
              {task.attachments && task.attachments.length > 0 && (
                <Image
                  src={`/${task.attachments[0].fileURL}`}
                  alt={task.attachments[0].fileName}
                  width={150}
                  height={80}
                  className="rounded-md"
                />
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p>
            <strong>ID:</strong>
            {task.id}
          </p>
          <p>
            <strong>Title:</strong>
            {task.title}
          </p>
          <p>
            <strong>Description:</strong>
            {"   "} {task.description || "No description provided"}
          </p>
          <p className="flex items-center gap-1">
            <strong>Status: </strong>
            <p className={`rounded px-2 py-1 font-bold ${renderStatusStyle}`}>
              {task.status?.toUpperCase()}
            </p>
          </p>
          <p className="flex items-center gap-2">
            <strong>Priority: </strong>
            <p className="flex items-center justify-start">
              {task.priority} {priorityLogo[task.priority || "Medium"]}
            </p>
          </p>
          <p>
            <strong>Tags:</strong>
            {task.tags || "No tags"}
          </p>
          <p>
            <strong>Start Date:</strong>
            {"  "}

            {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
          </p>
          <p>
            <strong>Due Date:</strong>
            {"  "}
            {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
          </p>
          <p>
            <strong>Author:</strong>
            {task.author ? task.author.username : "Unknown"}
          </p>
          <p>
            <strong>Assignee:</strong>
            {task.assignee ? task.assignee.username : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
