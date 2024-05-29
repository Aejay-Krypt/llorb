import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MdDelete, MdSend } from "react-icons/md";
import { Task, User, Comment } from "../data/DataInterface";
import {
  getComments,
  getCurrentTask,
  openDeleteModal,
  setAllTasks,
  setComments,
  setCurrentComment,
} from "../store/slices/scheduleSlice";
import { apiBaseUrl } from "../data/Environment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getToken,
  getAssignees,
  setAssignees,
} from "../store/slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

export default function TaskView() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const assignees: User[] = useSelector(getAssignees);
  const activeTask: Task = useSelector(getCurrentTask);
  const comments: Comment[] = useSelector(getComments);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Task>(activeTask);
  const [commentData, setCommentData] = useState<Partial<Comment>>({
    taskId: activeTask.id,
    remark: "",
  });
  const setRemark = (text: string) => {
    setCommentData({ ...commentData, remark: text });
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

  async function fetchAssignees() {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiBaseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(setAssignees(response.data.data));
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchComments() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiBaseUrl}/comments/${activeTask.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(setComments(response.data.data));
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(() => ({ ...formData, [id]: value }));
  };

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${apiBaseUrl}/tasks/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchTasks();
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddComment(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(`${apiBaseUrl}/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        fetchComments();
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function deleteComment(comment: Comment): void {
    dispatch(setCurrentComment(comment));
    dispatch(openDeleteModal("comment"));
  }

  useEffect(() => {
    fetchComments();
    fetchAssignees();
  }, []);

  return (
    <div className="overflow-x-auto overflow-y-auto w-full p-6 bg-stone-200">
      <Toaster position="top-center" />
      <div className="flex flex-row space-x-6 w-full h-screen">
        <div className="w-1/2 pb-8">
          <div className="flex flex-row mb-4">
            <div className="w-[90%]">
              <p className="text-black uppercase font-semibold">TASK DETAILS</p>
            </div>
            <div className="flex items-right space-x-1 w-[10%]">
              <MdDelete
                className="text-lg cursor-pointer text-red-900 hover:text-red-500"
                onClick={() => dispatch(openDeleteModal("task"))}
              />
            </div>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                } border-0 border-b-2 w-full p-2 bg-transparent text-sm cursor-pointer focus:outline-none`}
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
                className="bg-transparent border-0 border-b-2 border-gray-300 w-full p-2 rounded text-sm cursor-pointer focus:outline-none"
                placeholder="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                className="bg-transparent border-0 border-b-2 border-gray-300 w-full p-2 rounded text-sm cursor-pointer focus:outline-none"
                placeholder="start date"
                value={formData.startDate}
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
                className="bg-transparent border-0 border-b-2 border-gray-300 w-full p-2 rounded text-sm cursor-pointer focus:outline-none"
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
                } bg-transparent border-0 border-b-2 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
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
                className="bg-transparent border-0 border-b-2 border-gray-300 w-full p-2 rounded text-sm cursor-pointer focus:outline-none"
                placeholder="label or category tag"
                value={formData.label}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select an option
              </label>
              <select
                id="status"
                defaultValue={formData.status}
                onChange={handleChange}
                className="bg-transparent border-0 border-b-2 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                required
              >
                <option selected>Choose a status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="userId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select an assignee
              </label>
              <select
                id="userId"
                defaultValue={formData.userId}
                onChange={handleChange}
                className="bg-transparent border-0 border-b-2 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                required
              >
                {assignees.length > 0 &&
                  assignees.map((assignee) => (
                    <option
                      key={assignee.id}
                      id={assignee.id}
                      value={assignee.id}
                    >
                      {assignee.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 rounded-md py-2.5 w-full text-sm font-bold hover:bg-blue-950 hover:text-white"
              >
                <p>{isLoading ? "saving..." : "Save Changes"}</p>
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 border-l-slate-600 border-2 px-4 relative">
          <p className="text-black uppercase font-semibold">TASK COMMENTS</p>
          <div>
            {comments.length > 0 &&
              comments.map((comment: Comment) => {
                return (
                  <div
                    key={comment.id}
                    className="bg-white p-2.5 rounded-md mt-6 flex items-center justify-between border"
                  >
                    <p>{comment.remark}</p>
                    <div className="flex items-center space-x-1">
                      <MdDelete
                        className="text-md cursor-pointer text-red-500 hover:text-red-800"
                        onClick={() => deleteComment(comment)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <form onSubmit={handleAddComment}>
            <div className="absolute bottom-0 w-full pr-4 flex flex-row items-center">
              <div className="w-[85%]">
                <textarea
                  id="remark"
                  rows={2}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Leave a comment..."
                  required
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setRemark(e.target.value)
                  }
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div className="w-[15%] px-2">
                <button
                  type="submit"
                  className="rounded-md px-2 py-4 w-full bg-green-300 hover:bg-green-800 text-gray-600 hover:text-white items-center justify-center flex"
                >
                  <MdSend className="text-md cursor-pointer text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
