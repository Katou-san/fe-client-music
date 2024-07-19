import React, { useState } from "react";
import "./_header.scss";
import SearchBar from "@/components/header/search/search";
import Avartar from "@/components/header/avatar/avartar";
import { Bell_Icon, User_Icon } from "@/Icons/icon_Figma";
import HeederModalDropDown from "@/components/customs/modalHeader/headerModal";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { useRouter } from "next/navigation";
function Header() {
  const routes = useRouter()
  const userProvider = useSelector((state: RootState) => state.auth);
  const [drop_Down, set_Drop] = useState(false);
  const [Bell, set_Bell] = useState(false);

  return (
    <header className="headerR ">
      <div className="frameSearch">
        <SearchBar />
      </div>
      <span></span>
      <div className="frameBell ">
        <div
          className="bellIcon cursor_pointer"
          onClick={() => set_Bell((prev) => !prev)}
        >
          <Bell_Icon active={Bell} w={25} />
        </div>
      </div>
      <div className="frameBtnHeader">
        {userProvider.Access_Token != "" && userProvider.is_Login ? (
          <div
            className="frameAvatar cursor_pointer"
            onClick={() => set_Drop(true)}
          >
            <Avartar />
          </div>
        ) : (
          <div className="FrameBtnLogins" onClick={() => {
            routes.push('/auths')
          }}>
            <div className="frameIcon">
              <User_Icon w={25} color="#fff" />
            </div>
            <h1>Login</h1>
          </div>
        )}

        <HeederModalDropDown
          set_Drop={() => set_Drop(false)}
          drop_Down={drop_Down}
          style={{ top: "100%", left: 0 }}
        />
      </div>
    </header>
  );
}

export default Header;
