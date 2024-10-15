export default function TaskCard({ children, tasks }) {
  return (
    <div className="flex flex-col text-center w-50 h-28 mx-3 my-3 rounded-md bg-white">
      <h2 className="text-xl mt-auto">{tasks.task}</h2>
      <div className="mt-auto mb-1">{children}</div>
    </div>
  );
}
