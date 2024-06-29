import React from "react";
import "./_header.scss";
import SearchBar from "@/components/header/search/search";
import Avartar from "@/components/header/avatar/avartar";
// import SearchBar from "../../Layout/SearchBar/SearchBar";
// import AvartarHeader from "../../Layout/AvatarHeader/AvartarHeader";
function Header() {
  return (
    <header className="headerR ">
      <div className="frameSearch">
        <SearchBar />
      </div>
      <div className="frameAvatar">
        <Avartar />
      </div>

    </header>
  );
}

export default Header;
