import React from "react";
import { MdEdit } from "react-icons/md";
import { TbBellZ } from "react-icons/tb";
import { GrCheckmark } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { handlePostType, handleTaskId, showForm } from "../features/taskSlice";

const Task = ({ task, index }) => {
  const dispatch = useDispatch();
  return (
    <div key={index} className="p-3 border flex  md:w-[35%] w-[95%] ">
      <img src="/me.jpg" className="w-10 h-10 rounded mr-2" alt="" />
      {/* <img src={task?.image_url} alt="" /> */}
      <div className="flex justify-between ">
        <div className="-mt-2">
          <h4 className=" text-xs md:text-base">{task?.task_msg}</h4>
          <p className="text-red-500 text-[8px] md:text-xs">
            {task?.task_date}
          </p>
        </div>

        <div className="flex">
          <div
            onClick={() => {
              dispatch(handleTaskId(task.id));
              dispatch(showForm(true));
              dispatch(handlePostType());
            }}
            className="edit p-[6px] mr-3 border  flex rounded justify-center items-center "
          >
            <MdEdit />
          </div>
          <div className="rounded flex shadow">
            <span className="flex justify-center p-[6px] items-center">
              <TbBellZ />
            </span>
            <span
              onClick={() => {
                dispatch(showForm(true));
                dispatch(handleTaskId(task.id));
              }}
              className="flex items-center justify-center p-[6px]"
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
