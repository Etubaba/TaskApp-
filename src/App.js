import TaskForm from "./components/TaskForm";
import { GrAdd, GrClose } from "react-icons/gr";
import Task from "./components/Task";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  details,
  handleLogin,
  handlePostReset,
  handlePostType,
  handleUserAccess,
  loginState,
  showForm,
} from "./features/taskSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { API_URL, BASE_URL } from "./apiUrl";

function App() {
  const [taskList, setTaskList] = useState([]);

  const dispatch = useDispatch();
  const openForm = useSelector((state) => state.task.form);
  const isLoggedIn = useSelector(loginState);
  const accessDetails = useSelector(details);

  const handleLogin = () => {
    axios
      .post(`${BASE_URL}login`, {
        email: "smithwills1989@gmail.com",
        password: "12345678",
      })
      .then((res) => {
        if (res.data.status === "success") {
          dispatch(handleUserAccess(res.data.results));

          toast
            .success(res.data.message, {
              position: "bottom-left",
            })
            .catch((err) => console.log(err));
        }
      });
  };

  const handleLogOut = () => {
    dispatch(handleUserAccess(null));
    toast.info("Logout completed", { position: "bottom-left" });
  };

  //get all task
  useEffect(() => {
    if (isLoggedIn) {
      const getTask = async () => {
        const taskUrl = `${API_URL}?company_id=${accessDetails?.company_id}`;
        await axios({
          method: "GET",
          // url: taskUrl,
          url: `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${accessDetails.company_id}`,
          headers: {
            Authorization: "Bearer " + accessDetails?.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => setTaskList(res.data.results))
          .catch((err) => console.log(err));
      };
      getTask();
    }
  }, [accessDetails]);

  return (
    <div className=" flex overflow-auto">
      <div
        className={
          openForm
            ? " h-auto bg-[#323E4D] w-[15%]"
            : " h-screen bg-[#323E4D] w-[15%]"
        }
      ></div>
      <div
        className={
          openForm
            ? "h-auto w-[85%] bg-[#FAFAFA]"
            : "w-[85%] h-screen bg-[#FAFAFA]"
        }
      >
        <div className="w-full h-10 shadow">
          {" "}
          {accessDetails !== null ? (
            <button
              onClick={handleLogOut}
              className="bg-green-600 py-1 text-sm hover:bg-green-500 ml-3 text-white px-4  rounded-md mt-1 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-600 p-1 text-sm hover:bg-green-500 ml-3 text-white px-4  rounded-md mt-1 cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
        <div className="p-5">
          <div className="flex pr-2 pl-2 justify-between w-[95%] md:w-[35%] bg-[#f5f5f5]">
            <span className="flex text-sm space-x-2 mt-1">
              <p>Task</p> <p>{taskList.length}</p>
            </span>

            <div>
              <div className="flex border p-1 justify-center items-center ">
                {openForm ? (
                  <GrClose
                    onClick={() => dispatch(showForm(false))}
                    className="add"
                  />
                ) : (
                  <GrAdd
                    onClick={() => {
                      dispatch(handlePostReset(0));
                      dispatch(showForm(true));
                    }}
                    className="add"
                  />
                )}
              </div>
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
