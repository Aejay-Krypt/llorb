import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../data/DataInterface";

interface AuthState {
  token: string;
  user: User;
  assignees: User[];
}

const initialState: AuthState = {
  token: "",
  user: {} as User,
  assignees: [] as User[],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = btoa(action.payload);
    },
    resetAuth: (state) => {
      state.token = "";
      state.user = {} as User;
    },
    setAuthUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAssignees: (state, action: PayloadAction<User[]>) => {
      state.assignees = action.payload;
    },
  },
});

export const { setAuthToken, resetAuth, setAuthUser, setAssignees } =
  authSlice.actions;

export const getToken = (state: { auth: AuthState }): string =>
  atob(state.auth.token);

export const getUser = (state: { auth: AuthState }): User => state.auth.user;

export const getAssignees = (state: { auth: AuthState }): User[] =>
  state.auth.assignees;

export default authSlice.reducer;
