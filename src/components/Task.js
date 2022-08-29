import React from "react";
import { MdEdit } from "react-icons/md";
import { TbBellZ } from "react-icons/tb";
import { GrCheckmark } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { handlePostType, handleTaskId, showForm } from "../features/taskSlice";

const Task = ({ task, index }) => {
  const dispatch = useDispatch();
  return (
    <div
      key={index}
      className="p-3 border flex justify-between  md:w-[35%] w-[95%] "
    >
      <div className="flex">
        <img src="/me.jpg" className="w-10 h-10 rounded mr-2" alt="" />
        {/* <img src={task?.image_url} alt="" /> */}
        <div className="flex ">
          <div className="-mt-2">
            <h4 className=" text-xs md:text-base">{task?.task_msg}</h4>
            <p className="text-red-500 text-[8px] md:text-xs">
              {task?.task_date}
            </p>
          </div>
        </div>
      </div>

      <div className="flex">
        <div
          onClick={() => {
            dispatch(handleTaskId(task.id));
            dispatch(showForm(true));
            dispatch(handlePostType());
          }}
          className=" hover:bg-slate-100 h-8  p-2 mr-3 border  flex rounded  "
        >
          <MdEdit />
        </div>
        <div className="rounded flex border h-8 ">
          <span className="flex justify-center p-2  items-center">
            <TbBellZ />
          </span>
          <span
            onClick={() => {
              dispatch(showForm(true));
              dispatch(handleTaskId(task.id));
            }}
            className="flex items-center justify-center p-2"
          >
            <GrCheckmark />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Task;
