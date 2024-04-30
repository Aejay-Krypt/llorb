import { Route, Routes } from "react-router-dom";
import Sidebar from "./sidebar";
import Board from "../components/board";
import TaskModal from "../components/taskmodal";
import Settings from "../components/settings";
import TaskView from "../components/taskview";
import DeleteModal from "../components/deletemodal";

export default function Home() {
  return (
    <main className="flex h-full">
      <Sidebar activeRoute="" />
      <Routes>
        <Route path="settings" index element={<Settings />} />
        <Route path="task" index element={<TaskView />} />
        <Route path="/*" index element={<Board />} />
      </Routes>
      <TaskModal />
      <DeleteModal />
    </main>
  );
}
