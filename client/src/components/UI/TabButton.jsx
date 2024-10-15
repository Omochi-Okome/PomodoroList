export default function TabButton({ label, onSelect, currentMenu }) {
  let className =
    "flex h-10 ml-3 rounded-md text-xl bg-white  hover:bg-slate-200";

  if (label === currentMenu) {
    className = "flex h-10  ml-3 rounded-md  text-xl bg-slate-200";
  }

  return (
    <li className={className}>
      <button className="flex items-center ml-3 w-full" onClick={onSelect}>
        {label}
      </button>
    </li>
  );
}
