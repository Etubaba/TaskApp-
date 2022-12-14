import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL, BASE_URL } from "../apiUrl";

const TaskForm = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [user, setUser] = useState("");
  const [adminUsers, setAdminUsers] = useState([]);

  const accessDetails = useSelector((state) => state.task?.accessDetails);
  const isLoggedIn = useSelector((state) => state.task?.login);
  const updateTask = useSelector((state) => state.task?.update);
  const task_id = useSelector((state) => state.task?.task_id);
  const isCompleted = useSelector((state) => state.task?.isCompleted);

  //fetch single task for update
  useEffect(() => {
    if (updateTask > 0 && task_id !== null) {
      console.log("running");
      const taskUrl = `${API_URL}/${task_id}?company_id=${accessDetails?.company_id}`;

      const config = {
        Headers: {
          Authorization: "Bearer " + accessDetails?.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const getTaskToUpdate = async () => {
        await axios.get(taskUrl, {}, config).then((res) => {
          if (res.data.status === "success") {
            setTask(res.data.results.task_msg);
            setDate(res.data.results.task_date);
            setTime(res.data.results.task_time);
            setUser(res.data.results.user_id);
          }
        });
      };

      getTaskToUpdate();
    }
  }, [updateTask]);

  //add task or update task
  const addTask = async () => {
    // check if its new task or update
    if (updateTask >= 1) {
      const updateURL = `${API_URL}/${task_id}?company_id=${accessDetails?.company_id}`;

      const seconds = time.split(":");
      const timeToSeconds =
        +seconds[0] * 60 * 60 + +seconds[1] * 60 + +seconds[2];

      const date1 = new Date("August 19, 1975 23:15:30 GMT+07:00");
      const timeZoneToSeconds = date1.getTimezoneOffset();

      const formBody = {
        assigned_user: user,
        task_date: date,
        task_time: timeToSeconds,
        task_msg: task,
        time_zone: timeZoneToSeconds,
        is_completed: isCompleted ? 1 : 0,
      };

      const config = {
        Headers: {
          Authorization: "Bearer " + accessDetails?.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios.put(updateURL, formBody, config).then((res) => {
        if (res.data.staus === "success") {
          toast.success(res.data.message, {
            position: "bottom-left",
          });
        } else {
          toast.success("something went wrong", {
            position: "bottom-left",
          });
        }
      });
    } else {
      const postURL = `${API_URL}?company_id=${accessDetails?.company_id}`;
      const seconds = time.split(":");
      const timeToSeconds =
        +seconds[0] * 60 * 60 + +seconds[1] * 60 + +seconds[2];

      const date1 = new Date("August 19, 1975 23:15:30 GMT+07:00");
      const timeZoneToSeconds = date1.getTimezoneOffset();

      const formBody = {
        assigned_user: user,
        task_date: date,
        task_time: "5665",
        task_msg: task,
        time_zone: timeZoneToSeconds,
        is_completed: 0,
      };

      const config = {
        Headers: {
          Authorization: "Bearer " + accessDetails?.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      //  await fetch({
      //   method: 'POST',
      //   url:postURL,
      //   headers:config,
      //   body:JSON.stringify(formBody)
      //  })
      //  .then(response => response.json())
      await axios
        .post(postURL, formBody, config)
        .then((res) => {
          if (res.data.staus === "success") {
            toast.success(res.data.message);
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  //deleteTask
  const deleteTask = () => {
    if (task_id !== null) {
      const deleteURL = `${API_URL}/${task_id}?company_id=${accessDetails?.company_id}`;
      axios
        .delete(deleteURL, {
          Headers: {
            Authorization: "Bearer " + accessDetails?.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Task deleted successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //fetch admin users
  useEffect(() => {
    const getAdminUsers = async () => {
      await axios
        .get(
          `${BASE_URL}team?product=outreach&company_id=${accessDetails?.company_id}`,
          {
            headers: {
              Authorization: "Bearer " + accessDetails?.token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => setAdminUsers(res.data.results.data));
    };
    getAdminUsers();
  }, []);

  return (
    <div className="h-[19rem] w-[95%] md:h-80 md:w-[35%] p-3 bg-[#EDF7FC]">
      <div className="flex flex-col mb-4">
        <label htmlFor="task-name">Task Description</label>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          id="task-name"
          type="text"
          className=" p-2 my-1 outline-none"
          placeholder=" Enter Task"
        />
      </div>
      <div className="flex space-x-3 md:space-x-5 w-full mb-3">
        <div className="w-[45%]">
          <label htmlFor="date">Date </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            className="p-2 my-1 outline-none"
            type="date"
          />
        </div>

        <div className="w-[45%]">
          <label htmlFor="time">Time</label>
          <input
            value={time}
            className=" my-1 outline-none"
            onChange={(e) => setTime(e.target.value)}
            id="time"
            type="time"
          />
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="admin">Assigned User</label>
        <select
          value={user}
          className="p-2 outline-none"
          onChange={(e) => setUser(e.target.value)}
          id="admin"
        >
          {adminUsers?.map((user, idx) => (
            <option key={idx} value={user.user_id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between">
        <MdDelete onClick={deleteTask} className="mt-2" />
        <div className="flex justify-end items-end">
          <p className="mt-2 mx-[5px]">Cancel</p>
          <button
            onClick={addTask}
            className="bg-green-600 text-sm hover:bg-green-500 ml-3 text-white px-4  py-1 rounded-sm mt-1 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
