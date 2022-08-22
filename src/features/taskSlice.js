import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessDetails: localStorage.getItem("taskaccess")
    ? JSON.parse(localStorage.getItem("taskaccess"))
    : null,
  login: localStorage.getItem("tasklogin")
    ? localStorage.getItem("tasklogin")
    : false,
  update: null,
  task_id: null,
  iscompleted: null,
  form:false
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
   
    handlePostType: (state, action) => {
      state.update = action.payload;
    },
   
    handleTaskId: (state, action) => {
      state.task_id = action.payload;
    },
    showForm: (state, action) => {
      state.form = action.payload;
    },
    handleTaskCompletion: (state, action) => {
      state.iscompleted = action.payload;
    },
    handleUserAccess: (state, action) => {
      state.accessDetails = action.payload;
      state.login = true;
      localStorage.setItem("taskaccess", JSON.stringify(state.accessDetails));
      localStorage.setItem("tasklogin", state.login);
    },
  },
});

export const { handleUserAccess,handleTaskCompletion, handleTaskId, handlePostType,showForm} =
  taskSlice.actions;

export const loginState = (state) => state.task?.login;
export const details = (state) => state.task?.accessDetails;
export default taskSlice.reducer;
