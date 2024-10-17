import Message from "./Message";
import TaskCard from "./UI/TaskCard";

export default function TaskBoard({ title, ...taskBoardProps }) {
  return (
    <div className="flex flex-col items-center w-auto bg-slate-50 mt-3 mr-1">
      <h1>{title}</h1>
      <div className="flex flex-nowrap">
        <input
          className="h-10 w-auto pl-5 rounded-full"
          value={taskBoardProps.inputValue}
          onChange={taskBoardProps.handleInputChange}
          placeholder="Enter..."
        />
        <button
          className="bg-blue-700 hover:opacity-70 text-white rounded-md mx-3 w-20 h-10"
          onClick={taskBoardProps.handleSubmit}
        >
          Add
        </button>
      </div>
      {taskBoardProps.tasks.map((tasks) => (
        <TaskCard
          key={tasks._id}
          tasks={tasks.task}
          deleteTask={taskBoardProps.deleteTask}
        />
      ))}
      {taskBoardProps.tasks.length === 0 && (
        <Message message="There is no task!" />
      )}
    </div>
  );
}
