import SideMenu from "../components/SideMenu";

export default function All() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-40 pt-10">
        <SideMenu currentMenu="Home" />
      </div>
      <div className="flex flex-col w-full items-center bg-slate-100 pt-10"></div>
    </div>
  );
}
