import { MdCheck, MdAccessTime } from "react-icons/md";

export default function TaskCard({ tasks, deleteTask }) {
  return (
    <div className="flex items-center w-full h-12 mx-3 my-1 rounded-md bg-white">
      <div className="mt-auto mb-1">
        <div className="flex">
          <button name="Done" onClick={() => deleteTask(tasks._id, tasks)}>
            <MdCheck className="size-10 hover:size-12" />
          </button>
          <button name="Start" onClick={() => console.log("Start!!")}>
            <MdAccessTime className="size-10 hover:size-12" />
          </button>
        </div>
      </div>
      <h2 className="text-xl">{tasks}</h2>
    </div>
  );
}
