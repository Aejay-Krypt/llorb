import { useEffect, useState } from "react";
import { Task } from "../data/DataInterface";
import {
  getOverdueTasks,
  getCompletedTasks,
  getPendingTasks,
  setAllTasks,
  setCurrentTask,
  getAllTasks,
  setPendingTasks,
  setOverdueTasks,
  setCompletedTasks,
} from "../store/slices/scheduleSlice";
import { store } from "../store";
import { apiBaseUrl } from "../data/Environment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function Board() {
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pendingData = getPendingTasks(store.getState());
  const overdueDate = getOverdueTasks(store.getState());
  const completedData = getCompletedTasks(store.getState());
  const allTasks: Task[] = useSelector(getAllTasks);
  const [pendingTasks, setPending] = useState<Task[]>(pendingData);
  const [overdueTasks, setOverdue] = useState<Task[]>(overdueDate);
  const [completedTasks, setCompleted] = useState<Task[]>(completedData);

  const distributeTasks = (tasks: Task[]) => {
    const pending = tasks.filter((task) => task.status === "pending");
    const overdue = tasks.filter((task) => task.status === "overdue");
    const completed = tasks.filter((task) => task.status === "completed");
    return { pending, overdue, completed };
  };

  async function fetchTasks() {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiBaseUrl}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(setAllTasks(response.data.data));
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const openTask = (task: Task) => {
    dispatch(setCurrentTask(task));
    navigate("task");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const { pending, overdue, completed } = distributeTasks(allTasks);
    setPending(pending);
    setOverdue(overdue);
    setCompleted(completed);

    dispatch(setPendingTasks(pending));
    dispatch(setOverdueTasks(overdue));
    dispatch(setCompletedTasks(completed));
  }, [allTasks]);

  function dueCalculation(duedate: string, suffix: string) {
    if (duedate == null) {
      return "";
    }
    const currentDate = new Date();
    const dueDate = new Date(duedate);
    const differenceInTime = dueDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return Math.abs(differenceInDays) + " " + suffix;
  }

  return (
    <div className="overflow-x-auto overflow-y-auto w-full p-6 bg-stone-200">
      <Toaster position="top-center" />
      {isLoading ? (
        <p className="text-3xl w-full text-center font-semibold">
          Loading tasks...
        </p>
      ) : (
        <div className="flex space-x-6">
          <div className="w-1/3 shrink-0">
            <p className="text-black uppercase font-semibold">
              PENDING ({pendingTasks.length})
            </p>
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task: Task) => {
                return (
                  <div
                    key={task.id}
                    onClick={() => openTask(task)}
                    className="flex flex-col bg-white py-2 px-2.5 rounded-md mt-6 justify-between border cursor-pointer"
                  >
                    <p className="capitalize">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <small className="text-right text-gray-500">
                      {dueCalculation(task.dueDate, "days left")}
                    </small>
                  </div>
                );
              })
            ) : (
              <div className="mt-6 h-full rounded-md border-dashed border-4 border-white" />
            )}
          </div>

          <div className="w-1/3 shrink-0">
            <p className="text-green-800 uppercase font-semibold">
              COMPLETED ({completedTasks.length})
            </p>
            {completedTasks.length > 0 ? (
              completedTasks.map((task: Task) => {
                return (
                  <div
                    key={task.id}
                    onClick={() => openTask(task)}
                    className="flex flex-col bg-white py-2 px-2.5 rounded-md mt-6 justify-between border cursor-pointer"
                  >
                    <p className="capitalize">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                );
              })
            ) : (
              <div className="mt-6 h-full rounded-md border-dashed border-4 border-white" />
            )}
          </div>

          <div className="w-1/3 shrink-0">
            <p className="text-red-600 uppercase font-semibold">
              OVERDUE ({overdueTasks.length})
            </p>
            {overdueTasks.length > 0 ? (
              overdueTasks.map((task: Task) => {
                return (
                  <div
                    key={task.id}
                    onClick={() => openTask(task)}
                    className="flex flex-col bg-white py-2 px-2.5 rounded-md mt-6 justify-between border cursor-pointer"
                  >
                    <p className="capitalize">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <small className="text-right text-red-500">
                      {dueCalculation(task.dueDate, "days past")}
                    </small>
                  </div>
                );
              })
            ) : (
              <div className="mt-6 h-full rounded-md border-dashed border-4 border-white" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
