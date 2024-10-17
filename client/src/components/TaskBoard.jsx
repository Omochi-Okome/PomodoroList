import Button from "./UI/Button";
import Input from "./UI/Input";
import Message from "./Message";
import TaskCard from "./UI/TaskCard";

import { MdCheck, MdAccessTime } from "react-icons/md";

export default function TaskBoard({
  deleteTask,
  handleInputChange,
  handleSubmit,
  inputValue,
  tasks,
  title,
}) {
  return (
    <div className="flex flex-col items-center w-full bg-slate-50 mt-3 mr-1">
      <h1>{title}</h1>
      <div>
        <Input inputValue={inputValue} handleInputChange={handleInputChange} />
        <Button handle={handleSubmit}>Add</Button>
      </div>
      {tasks.map((tasks) => (
        <TaskCard key={tasks._id} tasks={tasks}>
          <div className="flex">
            <button
              name="Done"
              onClick={() => deleteTask(tasks._id, tasks.task)}
            >
              <MdCheck className="size-10 hover:size-12" />
            </button>
            <button name="Start" onClick={() => console.log("Start!!")}>
              <MdAccessTime className="size-10 hover:size-12" />
            </button>
          </div>
        </TaskCard>
      ))}
      {tasks.length === 0 && <Message message="There is no task!" />}
    </div>
  );
}
