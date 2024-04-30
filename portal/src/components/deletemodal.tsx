import { Modal, ModalBody } from "./modal";
import { useSelector, useDispatch } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import { store } from "../store";
import axios from "axios";
import toast from "react-hot-toast";
import { apiBaseUrl } from "../data/Environment";
import { getToken } from "../store/slices/authSlice";
import {
  getDeleteModalState,
  closeDeleteModal,
  setAllTasks,
  getCurrentTask,
  getDeleteModalVariant,
  getCurrentComment,
  setComments,
} from "../store/slices/scheduleSlice";
import { Task } from "../data/DataInterface";
import { useNavigate } from "react-router-dom";

export default function DeleteModal() {
  const navigate = useNavigate();
  const token = useSelector(getToken);
  const activeTask: Task = useSelector(getCurrentTask);
  const currentComent: Task = useSelector(getCurrentComment);
  const modalVariant: any = useSelector(getDeleteModalVariant);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => dispatch(closeDeleteModal());

  useEffect(() => {
    const handleStateChange = () => {
      setIsOpen(getDeleteModalState(store.getState()));
    };

    handleStateChange();

    const unsubscribe = store.subscribe(handleStateChange);
    return () => unsubscribe();
  }, []);

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

  async function fetchComments() {
    try {
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
      toast.error(error.message);
    }
  }

  async function handleTaskDelete(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `${apiBaseUrl}/tasks/${activeTask.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 202) {
        fetchTasks();
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  }

  async function handleCommentDelete(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `${apiBaseUrl}/comments/${currentComent.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 202) {
        fetchComments();
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <ModalBody>
        <h3 className="font-bold text-black mb-5 capitalize">{`${modalVariant} delete`}</h3>
        <div className="space-y-4">
          <p className="text-base text-black">
            Confirm deletion of {modalVariant}?
          </p>
          <button
            type="submit"
            onClick={
              modalVariant == "task" ? handleTaskDelete : handleCommentDelete
            }
            className="bg-green-700 rounded-3xl py-2 text-sm font-bold w-fit px-4 hover:bg-green-500 hover:text-white"
          >
            <p>Proceed</p>
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
