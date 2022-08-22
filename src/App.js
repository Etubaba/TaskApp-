import TaskForm from "./components/TaskForm";
import { GrAdd,GrClose} from "react-icons/gr";
import Task from "./components/Task";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  details,
  handleLogin,
  handlePostType,
  handleUserAccess,
  loginState,
  showForm,
} from "./features/taskSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function App() {
  const [taskList, setTaskList] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  const [userIn, setUserIn] = useState(false);
  const dispatch = useDispatch();
 const openForm= useSelector(state=>state.task.form)
  const isLoggedIn = useSelector(loginState);
  const accessDetails = useSelector(details);

  const handleLogin = () => {
    axios
      .post("https://stage.api.sloovi.com/login", {
        email: "smithwills1989@gmail.com",
        password: "12345678",
      })
      .then((res) => {
        if (res.data.status === "success") {
          dispatch(handleUserAccess(res.data.results));
          setUserIn(true);
          toast
            .success(res.data.message, {
              position: "bottom-left",
            })
            .catch((err) => console.log(err));
        }
      });
  };

  const handleLogOut = () => {
    setUserIn(false);
    dispatch(handleUserAccess(null));
    localStorage.removeItem("tasklogin");
    localStorage.removeItem("taskaccess");
    toast.info("Logout completed", { position: "bottom-left" });
  };

  //get all task
  useEffect(() => {
    // if (isLoggedIn) {
      const getTask = async () => {
        const taskUrl = `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${accessDetails?.company_id}`;
       axios.post(taskUrl,{
        method: 'POST',
        // url: taskUrl,
        headers: {
            'Authorization': "Bearer " + accessDetails?.token,
            'Accept': "application/json",
            "Content-Type": "application/json",
          },


       }).then(res=>setTaskList(res.data.results))
       .catch(err=>console.log(err));
       
       
        // await fetch({
        //   method: "GET",
        //   mode:"no-cors",
        //   url:taskUrl,
        //   Headers: {
            
        //     'Authorization': 'Bearer ' + accessDetails?.token,
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   credentials: "include"
        // })
        //   .then((res) => res.json())
        //   //.then((res) => console.log(`${res}`))
        //   .catch((err) => console.log(err));
      };
      getTask();
    
  }, []);

 
  return (
    <div className="layout">
      <div className="nav"></div>
      <div className="outlet">
        <div className="header">
          {" "}
          {isLoggedIn ? (
            <button onClick={handleLogOut} className="save">
              Logout
            </button>
          ) : (
            <button onClick={handleLogin} className="save">
              Login
            </button>
          )}
        </div>
        <div className="main">
          <div className="task-head">
            <span style={{ display: "flex" }}>
              <p style={{ marginRight: "6px" }}>Task</p>{" "}
              <p>{taskList.length}</p>
            </span>
            <div  className="icon">
              {openForm ? (
                <GrClose
                  onClick={() => dispatch(showForm(false))}
                  className="add"
                />
              ) : (
                <GrAdd
                  onClick={() =>{ 
                    dispatch(handlePostType(0))
                    dispatch(showForm(true))
                  }}
                  className="add"
                />
              )}
            </div>
          </div>
          {openForm && <TaskForm />}

          {taskList?.map((task, idx) => (
            <Task index={idx} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
