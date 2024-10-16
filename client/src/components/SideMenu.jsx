import * as React from "react";
import { useNavigate } from "react-router-dom";

import { HiHome } from "react-icons/hi2";

import TabButton from "./UI/TabButton";

export default function SideMenu({ currentMenu }) {
  const navigate = useNavigate();

  function handleMenu(destination) {
    navigate(`/dashboard/${destination}`);
  }

  return (
    <div>
      <menu>
        <TabButton
          label="Home"
          onSelect={() => handleMenu("home")}
          currentMenu={currentMenu}
        />
        <TabButton
          label="Task"
          onSelect={() => handleMenu("task")}
          currentMenu={currentMenu}
        />
        <TabButton
          label="Archive"
          onSelect={() => handleMenu("archiveTask")}
          currentMenu={currentMenu}
        />
      </menu>
    </div>
  );
}
