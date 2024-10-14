import * as React from "react";
import { useNavigate } from "react-router-dom";

import TabButton from "./UI/TabButton";

export default function SideMenu({ currentMenu }) {
  const navigate = useNavigate();

  function handleMenu(index) {
    switch (index) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/archive");
        break;
    }
  }

  return (
    <div>
      <menu className="">
        <TabButton
          label="Home"
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
