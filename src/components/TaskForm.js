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
  const [adminUsers,setAdminUsers] = useState([]);

  const accessDetails = useSelector((state) => state.task?.accessDetails);
  const isLoggedIn = useSelector((state) => state.task?.login);
  const updateTask = useSelector((state) => state.task?.update);
  const task_id = useSelector((state) => state.task?.task_id);
  const isCompleted = useSelector((state) => state.task?.isCompleted);



//fetch single task for update
   useEffect(() => {
    
    if(updateTask> 0 && task_id!==null){
      const taskUrl = `${API_URL}/${task_id}?company_id=${accessDetails?.company_id}`;
        const getTaskToUpdate= async()=>{
         await axios({
            url:taskUrl,
            method: 'GET',
            Headers : {
                'Authorization': 'Bearer ' + accessDetails?.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',          
              },
            Body :{ } 
          }).then(res=>{
            console.log('single',res)
            if(res.data.status==='success'){
              setTask(res.data.results.task_msg)
              setDate(res.data.results.task_date)
              setTime(res.data.results.task_time)
              setUser(res.data.results.task_user)
            }
          })
        }

        getTaskToUpdate()
    }
  }, [updateTask])
  
//add task or update task
  const addTask = async() => {
    // check if its new task or update
    if (updateTask >= 1) {
      const updateURL = `${API_URL}/${task_id}?company_id=${accessDetails?.company_id}`;

      const seconds = time.split(":");
      const timeToSeconds =
        +seconds[0] * 60 * 60 + +seconds[1] * 60 + +seconds[2];

         const date1 = new Date("August 19, 1975 23:15:30 GMT+07:00");
         const timeZoneToSeconds = date1.getTimezoneOffset();

      const formBody = {
        assigned_user: accessDetails?.user_id,
        task_date: date,
        task_time: timeToSeconds,
        task_msg: task,
        time_zone: timeZoneToSeconds,
        is_completed: isCompleted ? 1 : 0,
      };
    await  axios({
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
      const postURL = `${API_URL}?company_id=${accessDetails?.company_id}`;
      const seconds = time.split(":");
      const timeToSeconds =
        +seconds[0] * 60 * 60 + +seconds[1] * 60 + +seconds[2];

      const date1 = new Date("August 19, 1975 23:15:30 GMT+07:00");
      const timeZoneToSeconds = date1.getTimezoneOffset();

      const formData= new FormData();
      formData.append("assigned_user", accessDetails?.user_id);
      formData.append("task_date", date);
      formData.append("task_time", timeToSeconds);
      formData.append("task_msg", task);
      formData.append("time_zone", timeZoneToSeconds);
      formData.append("is_completed", 0);
     
      const formBody = {
        assigned_user: accessDetails?.user_id,
        task_date: date,
        task_time: timeToSeconds,
        task_msg: task,
        time_zone: timeZoneToSeconds,
        is_completed:  0,
      };

     await axios({
        method: "POST",
        // url: postURL,
        url: `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${accessDetails?.company_id}`,
        Headers: {
          Authorization: "Bearer " + accessDetails?.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        Body: formData,
      })
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
      // fetch({
      //   method: "POST",
      //   url: updateURL,
      //   Headers: {
      //     Authorization: "Bearer " + accessDetails?.token,
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   Body: formBody,
      // }).then(res=>res.json())
      // .then((res) => {
      //   if (res.data.staus === "success") {
      //     alert(res.data.message);
      //   } else {
      //     alert("Something went wrong");
      //   }
      // });
    }
  };


  //deleteTask
  const deleteTask = () => {
 if(task_id!==null) {  const deleteURL = `${API_URL}/${task_id}?company_id=${accessDetails?.company_id}`;
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
    })}
    
  };


  //fetch admin users
  useEffect(() => {
    const getAdminUsers = async() => {
     await axios.get(
       `${BASE_URL}team?product=outreach&company_id=${accessDetails?.company_id}`
     ).then(res=>setAdminUsers(res.data.results));
    }
    getAdminUsers()
  }, [])


 


  console.log('admin',adminUsers)

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
        { adminUsers?.map((user,idx) => <option key={idx} value="admin3">Admin3</option>)}
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
