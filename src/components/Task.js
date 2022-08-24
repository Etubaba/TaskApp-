import React from "react";
import { MdEdit } from "react-icons/md";
import { TbBellZ } from "react-icons/tb";
import { GrCheckmark } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { handlePostType, handleTaskId, showForm } from "../features/taskSlice";

const Task = ({task,index}) => {
    const dispatch =useDispatch()
  return (
    <div key={index} className="added-task">
      {/* <img src="/me.jpg" alt="" /> */}
      <img src={task?.image_url} alt="" />
      <div className="task-details">
        <div className="title">
          <h4>{task?.task_msg}</h4>
          <p>{task?.task_date}</p>
        </div>

        <div className="action-icon">
          <div
            onClick={() => {
              dispatch(handleTaskId(task.id));
              dispatch(showForm(true));
              dispatch(handlePostType());
            }}
            className="edit"
          >
            <MdEdit />
          </div>
          <div className="bellicon">
            <span className="task-icon">
              <TbBellZ />
            </span>
            <span
              onClick={() => {
                dispatch(showForm(true));
                dispatch(handleTaskId(task.id));
              }}
              className="task-icon"
            >
              <GrCheckmark />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
