import React, { useState } from "react";
import "./_header.scss";
import SearchBar from "@/components/header/search/search";
import Avartar from "@/components/header/avatar/avartar";
import { Bell_Icon } from "@/Icons/icon_Figma";
function Header() {
  const [Bell, set_Bell] = useState(false)

  return (
    <header className="headerR ">
      <div className="frameSearch">
        <SearchBar />
      </div>
      <span></span>
      <div className="frameBell ">
        <div className="bellIcon cursor_pointer" onClick={() => set_Bell(prev => !prev)}>
          <Bell_Icon active={Bell} w={25} />
        </div>

      </div>
      <div className="frameAvatar cursor_pointer">
        <Avartar />
      </div>

    </header>
  );
}

export default Header;
