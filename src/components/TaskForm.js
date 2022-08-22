import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const TaskForm = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [user, setUser] = useState("");

  const accessDetails = useSelector((state) => state.task?.accessDetails);
  const isLoggedIn = useSelector((state) => state.task?.login);
  const update = useSelector((state) => state.task?.update);
  const task_id = useSelector((state) => state.task?.tast_id);
  const isCompleted = useSelector((state) => state.task?.isCompleted);

  const addTask = () => {
    // check if its new task or update
    if (update === 1) {
      const updateURL = `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${accessDetails?.company_id}`;

      const seconds = time.split(":");
      const timeToSeconds =
        +seconds[0] * 60 * 60 + +seconds[1] * 60 + +seconds[2];

         const date1 = new Date("August 19, 1975 23:15:30 GMT+07:00");
         const timeZoneToSeconds = date1.getTimezoneOffset();

      const formBody = {
        assigned_user: accessDetails?.user_id,
        task_date: date?.toISOString()?.slice(0, 10),
        task_time: timeToSeconds,
        task_msg: task,
        time_zone: timeZoneToSeconds,
        is_completed: isCompleted ? 1 : 0,
      };
      axios({
        method: "PUT",
        url: updateURL,
        Headers: {
          Authorization: "Bearer " + accessDetails?.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        Body: formBody,
      }).then((res) => {
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
      console.log('//')
      const updateURL = `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${accessDetails?.company_id}`;
      const seconds = time.split(":");
      const timeToSeconds =
        +seconds[0] * 60 * 60 + +seconds[1] * 60 + +seconds[2];

      const date1 = new Date("August 19, 1975 23:15:30 GMT+07:00");
      const timeZoneToSeconds = date1.getTimezoneOffset();
      const formBody = {
        assigned_user: accessDetails?.user_id,
        task_date: date?.toISOString().slice(0, 10),
        task_time: timeToSeconds,
        task_msg: task,
        time_zone: timeZoneToSeconds,
        is_completed: isCompleted ? 1 : 0,
      };
      fetch({
        method: "POST",
        url: updateURL,
        Headers: {
          Authorization: "Bearer " + accessDetails?.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        Body: formBody,
      }).then(res=>res.json())
      .then((res) => {
        if (res.data.staus === "success") {
          alert(res.data.message);
        } else {
          alert("Something went wrong");
        }
      });
    }
  };

  const deleteTask = () => {
    const deleteURL = `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${accessDetails?.company_id}`;
    axios({
      method: "DELETE",
      url: deleteURL,
      Headers: {
        Authorization: "Bearer " + accessDetails?.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {},
    }).then((res) => {
      if (res.data.success) {
        toast.success("Task deleted successfully");
      }
    });
  };
  return (
    <div className="task-form">
      <div className="task-name">
        <label htmlFor="task-name">Task Description</label>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          id="task-name"
          type="text"
          placeholder=" Enter Task"
        />
      </div>
      <div className="task-description">
        <div className="date">
          <label htmlFor="date">Date </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            type="date"
          />
        </div>

        <div className="time">
          <label htmlFor="time">Time</label>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            id="time"
            type="time"
          />
        </div>
      </div>

      <div className="user">
        <label htmlFor="admin">Assigned User</label>
        <select
          value={user}
          onChange={(e) => setUser(e.target.value)}
          id="admin"
        >
          <option value="admin1">Admin1</option>
          <option value="admin2">Admin2</option>
          <option value="admin3">Admin3</option>
        </select>
      </div>

      <div className="actions">
        <MdDelete onClick={deleteTask} style={{ marginTop: "5px" }} />
        <div className="buttons">
          <p className="cancel">Cancel</p>
          <button onClick={addTask} className="save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
