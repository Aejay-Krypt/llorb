import { Modal, ModalBody } from "./modal";
import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  closeTaskModal,
  getTaskModalState,
  setAllTasks,
} from "../store/slices/scheduleSlice";
import { store } from "../store";
import { Task } from "../data/DataInterface";
import axios from "axios";
import toast from "react-hot-toast";
import { apiBaseUrl } from "../data/Environment";
import { getToken } from "../store/slices/authSlice";

export default function TaskModal() {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(closeTaskModal());

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    status: "pending",
    description: "",
    priority: "",
    dueDate: "",
    label: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(() => ({ ...formData, [id]: value }));
  };

  async function fetchTasks() {
    try {
      const response = await axios.get(`${apiBaseUrl}/tasks`, {
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

  async function handleNewTask(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(`${apiBaseUrl}/tasks`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        fetchTasks();
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const handleStateChange = () => {
      setIsOpen(getTaskModalState(store.getState()));
    };

    handleStateChange();

    const unsubscribe = store.subscribe(handleStateChange);
    return () => unsubscribe();
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <ModalBody>
        <h3 className="font-bold text-black mb-5">Create New Task</h3>
        <form className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              id="title"
              className={`${
                !formData.title ? "border-red-500" : "border-gray-300"
              } border w-full p-2 rounded text-sm cursor-pointer focus:outline-none`}
              placeholder="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              id="description"
              className="border-gray-300 border w-full p-2 rounded text-sm cursor-pointer focus:outline-none"
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              className="border-gray-300 border w-full p-2 rounded text-sm cursor-pointer focus:outline-none"
              placeholder="due date"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select a priority
            </label>
            <select
              id="priority"
              defaultValue={formData.priority}
              onChange={handleChange}
              className={`${
                !formData.title ? "border-red-500" : "border-gray-300"
              } bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              required
            >
              <option selected>Choose a priority</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="label"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Label or Category
            </label>
            <input
              id="label"
              className="border-gray-300 border w-full p-2 rounded text-sm cursor-pointer focus:outline-none"
              placeholder="label or category tag"
              value={formData.label}
              onChange={handleChange}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                handleNewTask(e);
              }}
              className="bg-blue-500 rounded-3xl py-2 w-full text-sm font-bold"
            >
              <p>{isLoading ? "creating..." : "Create New Task"}</p>
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
