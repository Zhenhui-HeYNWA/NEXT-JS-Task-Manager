import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  task: Task;
};

const statusColor: any = {
  "To Do": "#2563EB",
  "Work In Progress": "#059669",
  "Under Review": "#D97706",
  Completed: "#000000",
};
const TaskCard = ({ task }: Props) => {
  const taskStatusColor = statusColor[task.status ?? "To Do"];
  return (
    <div
      className="flex w-full gap-2 rounded border"
      style={{ borderColor: taskStatusColor }} // Apply dynamic border color
    >
      <div
        className={`h-full w-5 !bg-[${taskStatusColor}]`}
        style={{ backgroundColor: taskStatusColor }}
      />
      <div className="mb-3 w-full rounded bg-white dark:bg-dark-secondary dark:text-white">
        {task.attachments && task.attachments.length > 0 && (
          <div>
            <strong>Attachments:</strong>
            <div className="flex flex-wrap">
              {task.attachments && task.attachments.length > 0 && (
                <Image
                  src={`/${task.attachments[0].fileURL}`}
                  alt={task.attachments[0].fileName}
                  width={400}
                  height={200}
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
          <p>
            <strong>Status: </strong>
            {task.status}
          </p>
          <p>
            <strong>Priority: </strong>
            {task.priority}
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
