export default function Button({ handle, name }) {
  return (
    <button className="bg-blue-700 hover:opacity-70 text-white rounded-md mx-3 w-20 h-10" onClick={handle}>
      {name}
    </button>
  );
}
