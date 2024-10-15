import * as React from "react";
import { useNavigate } from "react-router-dom";

import TabButton from "./UI/TabButton";

export default function SideMenu({ currentMenu }) {
  const navigate = useNavigate();

  function handleMenu(index) {
    switch (index) {
      case 0:
        navigate("/dashboard/task");
        break;
      case 1:
        navigate("/dashboard/archiveTask");
        break;
    }
  }

  return (
    <div>
      <menu>
        <TabButton
          label="Task"
          onSelect={() => handleMenu(0)}
          currentMenu={currentMenu}
        />
        <TabButton
          label="Archive"
          onSelect={() => handleMenu(1)}
          currentMenu={currentMenu}
        />
      </menu>
    </div>
  );
}
