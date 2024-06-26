import React from "react";
import "./_header.scss";
import SearchBar from "@/components/header/search/search";
import Avartar from "@/components/header/avatar/avartar";
// import SearchBar from "../../Layout/SearchBar/SearchBar";
// import AvartarHeader from "../../Layout/AvatarHeader/AvartarHeader";
function Header() {
  return (
    <header className="headerR ">
      <ul className="NavR">
        <li className="btnNavR">
          <a>Discover</a>
        </li>
        <li className="btnNavR">
          <a>Raking</a>
        </li>
      </ul>
      <SearchBar />
      {/* <Avartar /> */}
    </header>
  );
}

export default Header;
