'use client'
import React, { useState } from "react";
import "./_search.scss";
import { SearchIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
export default function SearchBar() {
  // const Navigate = useNavigate();
  const [Seacrh, set_Seacrh] = useState("");

  const OnSubmit = (e: any) => {
    e.preventDefault();
    // Navigate(`/search?value=${Seacrh.replaceAll(" ", "_の_")}`);
  };
  return (
    <form
      onSubmit={OnSubmit}
      className="inputSearch"
      id={Seacrh === "" ? "notSearchValue" : "hasSearchValue"}
    >
      <SearchIcon color={"transparent"} />
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          set_Seacrh(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-primar">
        Go
      </button>
    </form>
  );
}
