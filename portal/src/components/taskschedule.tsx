import { useEffect, useState } from "react";
import { Task } from "../data/DataInterface";
import { setCurrentTask } from "../store/slices/scheduleSlice";
import { apiBaseUrl } from "../data/Environment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../store/slices/authSlice";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Data {
  [key: string]: Task[];
}

export default function TaskSchedule() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scheduleTasks, setScheduleTasks] = useState<Data>({});
  const navigate = useNavigate();

  async function fetchTasks() {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiBaseUrl}/tasks/simultaneous`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setScheduleTasks(response.data.data);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function getMonthName(month: string) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[parseInt(month) - 1];
  }

  const openTask = (task: Task) => {
    dispatch(setCurrentTask(task));
    navigate("/task");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="overflow-x-auto overflow-y-auto w-full p-6 bg-stone-200">
      <Toaster position="top-center" />
      <div className="flex space-x-6 w-full h-screen">
        <div className="w-full">
          <p>{isLoading && "loading..."}</p>
          <div>
            {Object.entries(scheduleTasks).map(
              ([month, tasks]) =>
                tasks.length > 0 && (
                  <div key={month} className="py-4">
                    <h2 className="text-black uppercase font-bold">
                      {getMonthName(month)}
                    </h2>
                    <ul>
                      {tasks.map((task: Task) => (
                        <div
                          key={task.id}
                          onClick={() => openTask(task)}
                          className="flex flex-col bg-white py-2 px-2.5 rounded-md mt-6 justify-between border cursor-pointer"
                        >
                          <p className="capitalize">{task.title}</p>
                          <p className="text-sm text-gray-600">
                            {task.description}
                          </p>
                          <small className="text-right text-gray-500">
                            {`${task.startDate} to ${task.dueDate}`}
                          </small>
                        </div>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
