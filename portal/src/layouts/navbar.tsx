import { useDispatch, useSelector } from "react-redux";
import { openTaskModal, setAllTasks } from "../store/slices/scheduleSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { apiBaseUrl } from "../data/Environment";
import toast from "react-hot-toast";
import { getToken } from "../store/slices/authSlice";
import axios from "axios";

export default function Navbar() {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string>("");

  async function searchTasks(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const response = await axios.get(`${apiBaseUrl}/tasks?search=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setAllTasks(response.data.data));
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <nav className="bg-white border flex h-24">
      <div className="flex-none w-[18.75rem] border-r-2 flex items-center pl-[2.12rem]">
        <p className="font-bold text-3xl"> LLORB TASKMASTER </p>
      </div>

      <div className="flex justify-between w-full items-center pr-[2.12rem]">
        <div className="mx-2 flex items-center w-2/3">
          <form onSubmit={searchTasks} className="w-full">
            <div className="relative w-full">
              <input
                type="search"
                id="location-search"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for tasks by title or description"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
              />
              <button
                type="submit"
                className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => dispatch(openTaskModal())}
            className="bg-blue-500 text-black px-4 py-2 flex rounded-3xl items-center space-x-2 hover:bg-blue-950 hover:text-white"
          >
            <p>+ Add New Task</p>
          </button>
        </div>
      </div>
    </nav>
  );
}
