import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessDetails: localStorage.getItem("taskaccess")
    ? JSON.parse(localStorage.getItem("taskaccess"))
    : null,
  login: localStorage.getItem("tasklogin")
    ? localStorage.getItem("tasklogin")
    : false,
  update: 0,
  task_id: null,
  iscompleted: null,
  form:false
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
   
    handleLogin: (state, action) => {
      state.login= false;
      localStorage.setItem("tasklogin", false);
    },
    handlePostType: (state, action) => {
      state.update +=1;
    },
    handlePostReset: (state, action) => {
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

      if(action.payload===null){
        state.login = false;
        localStorage.setItem("tasklogin", false);
        localStorage.setItem("taskaccess", null);
      }else{
      state.login = true;
      localStorage.setItem("taskaccess", JSON.stringify(state.accessDetails));
      localStorage.setItem("tasklogin", true);
      }
      
    },
  },
});

export const { handleUserAccess,handleTaskCompletion, handleLogin,
  handleTaskId,handlePostReset,handlePostType,showForm} =
  taskSlice.actions;

export const loginState = (state) => state.task?.login;
export const details = (state) => state.task?.accessDetails;
export default taskSlice.reducer;
