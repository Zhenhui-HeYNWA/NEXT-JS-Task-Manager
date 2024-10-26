"use client";

import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChevronDown,
  ChevronsDown,
  ChevronsDownUp,
  ChevronsUp,
  ChevronUp,
  Equal,
} from "lucide-react";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Image from "next/image";

const COLORS = ["#0088fe", "#00c49f", "#ffbb28", "#ff8042"];
const statusColor: any = {
  "To Do": "bg-gray-200 text-black dark:bg-[#31393F] dark:text-[#B5C2CF] ",
  "Work In Progress":
    "bg-[#0B65E4] text-white dark:bg-[#579DFF] dark:text-[#1D2125]",
  Completed: "bg-[#20845A] text-white dark:bg-[#4bce97] dark:text-[#1D2125]",
  "Under Review": "bg-[#d2a066] dark:text-orange-900 text-yellow-50",
};
const priorityLogo: any = {
  Urgent: <ChevronsUp className="h-6 w-6 text-red-500" />,
  High: <ChevronUp className="h-6 w-6 text-orange-500" />,
  Medium: <Equal className="text h-6 w-6 text-yellow-300" />,
  Low: <ChevronDown className="h-6 w-6 text-emerald-400" />,
  Backlog: <ChevronsDown className="h-6 w-6 text-green-900" />,
};
const taskColumns: GridColDef[] = [
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
      <span className="flex w-full items-center justify-start rounded font-bold">
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
const HomePage = () => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectsLoading) return <div>Loading..</div>;
  if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;

  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4a90e2",
        text: "#ffffff",
      }
    : {
        bar: "#8884d8",
        barGrid: "#e0e0e0",
        pieFill: "#82ca9d",
        text: "#000000",
      };

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      <Header name="Project Management DashBoard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }}
              />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart data={taskDistribution}>
              <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={tasksLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
