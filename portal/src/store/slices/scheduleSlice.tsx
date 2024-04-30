import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, Comment } from "../../data/DataInterface";

interface ScheduleState {
  allTasks: Task[];
  pendingTasks: Task[];
  overdueTasks: Task[];
  completedTasks: Task[];
  comments: Comment[];
  currentComent: any;
  currentTask: Task;
  taskModal: {
    isOpen: boolean;
  };
  deleteModal: {
    isOpen: boolean;
    variant: string | null;
  };
}

const initialState: ScheduleState = {
  allTasks: [] as Task[],
  pendingTasks: [] as Task[],
  overdueTasks: [] as Task[],
  completedTasks: [] as Task[],
  comments: [] as Comment[],
  currentComent: {} as Comment,
  currentTask: {
    status: "pending",
    priority: "normal",
  } as Task,
  taskModal: {
    isOpen: false,
  },
  deleteModal: {
    isOpen: false,
    variant: null,
  },
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.allTasks = action.payload;
    },

    setPendingTasks: (state, action: PayloadAction<Task[]>) => {
      state.pendingTasks = action.payload;
    },

    setOverdueTasks: (state, action: PayloadAction<Task[]>) => {
      state.overdueTasks = action.payload;
    },

    setCompletedTasks: (state, action: PayloadAction<Task[]>) => {
      state.completedTasks = action.payload;
    },

    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },

    setCurrentComment: (state, action: PayloadAction<Comment>) => {
      state.currentComent = action.payload;
    },

    resetSchedule: (state) => {
      state.pendingTasks = [];
      state.overdueTasks = [];
      state.completedTasks = [];
      state.comments = [];
      state.currentTask = {} as Task;
    },

    setCurrentTask: (state, action: PayloadAction<Task>) => {
      state.currentTask = action.payload;
    },

    openTaskModal: (state) => {
      state.taskModal.isOpen = true;
    },

    openDeleteModal: (state, action: PayloadAction<string>) => {
      state.deleteModal.isOpen = true;
      state.deleteModal.variant = action.payload;
    },

    closeTaskModal: (state) => {
      state.taskModal.isOpen = false;
    },

    closeDeleteModal: (state) => {
      state.deleteModal.isOpen = false;
      state.deleteModal.variant = null;
    },
  },
});

export const {
  setAllTasks,
  setPendingTasks,
  setCompletedTasks,
  setOverdueTasks,
  setComments,
  resetSchedule,
  setCurrentTask,
  openTaskModal,
  openDeleteModal,
  closeTaskModal,
  closeDeleteModal,
  setCurrentComment,
} = scheduleSlice.actions;

export const getAllTasks = (state: { schedule: ScheduleState }): Task[] =>
  state.schedule.allTasks;

export const getPendingTasks = (state: { schedule: ScheduleState }): Task[] =>
  state.schedule.pendingTasks;

export const getOverdueTasks = (state: { schedule: ScheduleState }): Task[] =>
  state.schedule.overdueTasks;

export const getCompletedTasks = (state: { schedule: ScheduleState }): Task[] =>
  state.schedule.completedTasks;

export const getComments = (state: { schedule: ScheduleState }): Comment[] =>
  state.schedule.comments;

export const getCurrentTask = (state: { schedule: ScheduleState }): Task =>
  state.schedule.currentTask;

export const getCurrentComment = (state: { schedule: ScheduleState }): any =>
  state.schedule.currentComent;

export const getTaskModalState = (state: {
  schedule: ScheduleState;
}): boolean => state.schedule.taskModal.isOpen;

export const getDeleteModalState = (state: {
  schedule: ScheduleState;
}): boolean => state.schedule.deleteModal.isOpen;

export const getDeleteModalVariant = (state: {
  schedule: ScheduleState;
}): string | null => state.schedule.deleteModal.variant;

export default scheduleSlice.reducer;
