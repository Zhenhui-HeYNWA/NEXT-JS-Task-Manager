import React from "react";
import ReusablePriorityPage from "../resusablePriorityPage";
import { Priority } from "@/state/api";

const Backlog = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;
