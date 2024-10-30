import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { useGetTasksQuery } from "@/state/api";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
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

type Props = { id: string; setIsModalNewTaskOpen: (isOpen: boolean) => void };

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
              ? `https://pm-s3-images-herbert.s3.us-east-1.amazonaws.com/${params.value.profilePictureUrl}`
              : "https://pm-s3-images-herbert.s3.us-east-1.amazonaws.com/avatardefault.png"
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
              ? `https://pm-s3-images-herbert.s3.us-east-1.amazonaws.com/${params.value.profilePictureUrl}`
              : "https://pm-s3-images-herbert.s3.us-east-1.amazonaws.com/avatardefault.png"
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
const Table = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
};

export default Table;
