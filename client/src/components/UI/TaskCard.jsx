export default function TaskCard({ children, tasks }) {
  return (
    <div className="flex items-center w-full h-12 mx-3 my-1 rounded-md bg-white">
      <div className=" mt-auto mb-1">{children}</div>
      <h2 className="text-xl">{tasks.task}</h2>
    </div>
  );
}
