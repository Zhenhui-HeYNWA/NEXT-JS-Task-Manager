"use client";
import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { Priority, Task, useGetTasksByUserQuery } from "@/state/api";
import { Modal } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
  Equal,
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import React, { useState } from "react";

type Props = {
  priority: Priority;
};

const priorityLogo: any = {
  Urgent: <ChevronsUp className="h-6 w-6 text-red-500" />,
  High: <ChevronUp className="h-6 w-6 text-orange-500" />,
  Medium: <Equal className="text h-6 w-6 text-yellow-300" />,
  Low: <ChevronDown className="h-6 w-6 text-emerald-400" />,
  Backlog: <ChevronsDown className="h-6 w-6 text-green-900" />,
};
const statusColor: any = {
  "To Do": "bg-gray-200 text-black dark:bg-[#31393F] dark:text-[#B5C2CF] ",
  "Work In Progress":
    "bg-[#0B65E4] text-white dark:bg-[#579DFF] dark:text-[#1D2125]",
  Completed: "bg-[#20845A] text-white dark:bg-[#4bce97] dark:text-[#1D2125]",
  "Under Review": "bg-[#d2a066] dark:text-orange-900 text-yellow-50",
};
const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span
        className={`inline-flex rounded shadow-md ${statusColor[params.value]} px-3 text-xs font-semibold leading-5`}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 130,
    renderCell: (params) => (
      <span className="flex w-full items-center">
        {priorityLogo[params.value]} {params.value}
      </span>
    ),
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
    renderCell: (params) => (
      <span className="rounded bg-blue-100 px-2 py-1 text-xs shadow-md dark:text-black">
        {params.value}
      </span>
    ),
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,

    renderCell: (params) => {
      return format(new Date(params.value), "P"); // Use params.value to get the date
      // Use params.value to get the date
    },
  },

  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
    renderCell: (params) => {
      return format(new Date(params.value), "P"); // Use params.value to get the date
    },
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => (
      <span className="flex items-center gap-2">
        <Image
          src={
            params.value?.profilePictureUrl
              ? `/${params.value.profilePictureUrl}`
              : "/avatardefault.png"
          }
          alt={`/${params.value?.profilePictureUrl} || ""`}
          width={30}
          height={30}
          className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
        />
        {params.value?.username || "Unknown"}
      </span>
    ),
  },

  //Unknown

  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => (
      <span className="flex items-center gap-2">
        <Image
          src={
            params.value?.profilePictureUrl
              ? `/${params.value.profilePictureUrl}`
              : "/avatardefault.png"
          }
          alt={`/${params.value?.profilePictureUrl} || "Unassign"`}
          width={30}
          height={30}
          className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
        />
        {params.value?.username || "Unassign"}
      </span>
    ),
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const userId = 1;
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTasksError || !tasks) return <div>Error fetching tasks</div>;
  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-2 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded-r`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
