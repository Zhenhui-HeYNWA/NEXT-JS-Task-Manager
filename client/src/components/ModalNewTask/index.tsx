import { Priority, Status, useCreateTasksMutation } from "@/state/api";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const ModalNewTask = ({ isOpen, onClose, id }: Props) => {
  const [createTask, { isLoading }] = useCreateTasksMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const handleSubmit = async () => {
    if (!title || !authorUserId) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: Number(id),
    });
  };
  const isFormValid = () => {
    const isDateValid = new Date(startDate) < new Date(dueDate);
    if (isDateValid) {
      return title && authorUserId;
    }
  };

  const selectStyles = `mb-4 block w-full rounded border border-gray-300 px-1 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none`;

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col items-start gap-2">
          <p className="px-2 font-semibold dark:text-white">Title :</p>
          <input
            type="text"
            className={inputStyles}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <p className="px-2 font-semibold dark:text-white">Description:</p>
          <textarea
            className={inputStyles}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* <div className="flex flex-col items-start gap-2">
          <p className="px-2 font-semibold dark:text-white">Start Date:</p>
          <input
            type="text"
            className={inputStyles}
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div> */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <div>
            <p className="px-2 font-semibold dark:text-white">Status:</p>
            <select
              className={selectStyles}
              value={status}
              onChange={(e) =>
                setStatus(Status[e.target.value as keyof typeof Status])
              }
            >
              <option value="">Select Option:</option>
              <option value={Status.ToDo}>To Do</option>
              <option value={Status.WorkInProgress}>Work In Progress</option>
              <option value={Status.UnderReview}>Under Review</option>
              <option value={Status.Completed}>Completed</option>
            </select>
          </div>
          <div>
            <p className="px-2 font-semibold dark:text-white">Priority:</p>
            <select
              className={selectStyles}
              value={priority}
              onChange={(e) =>
                setPriority(Priority[e.target.value as keyof typeof Priority])
              }
            >
              <option value="">Select Option:</option>
              <option value={Priority.Urgent}>Urgent</option>
              <option value={Priority.High}>High</option>
              <option value={Priority.Medium}>Medium</option>
              <option value={Priority.Low}>Low</option>
              <option value={Priority.Backlog}>Backlog</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="px-2 font-semibold dark:text-white">Tag :</p>
          <input
            type="text"
            className={inputStyles}
            placeholder="Tags (comma Separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <div>
            <p className="px-2 font-semibold dark:text-white">Start Date:</p>
            <input
              type="date"
              className={inputStyles}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <p className="px-2 font-semibold dark:text-white">Due Date:</p>
            <input
              type="date"
              className={inputStyles}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="px-2 font-semibold dark:text-white">Author :</p>
          <input
            type="text"
            className={inputStyles}
            placeholder="Author User ID"
            value={authorUserId}
            onChange={(e) => setAuthorUserId(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="px-2 font-semibold dark:text-white">Assign :</p>
          <input
            type="text"
            className={inputStyles}
            placeholder="Assignee User ID"
            value={assignedUserId}
            onChange={(e) => setAssignedUserId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid()}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
