import React from "react";
import ReusablePriorityPage from "../resusablePriorityPage";
import { Priority } from "@/state/api";

const Low = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Low;
