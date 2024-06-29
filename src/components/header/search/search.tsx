'use client'
import React, { useState } from "react";
import "./_search.scss";
import { SearchIcon } from "lucide-react";
export default function SearchBar() {
  const [Seacrh, set_Seacrh] = useState("");

  const OnSubmit = (e: any) => {
    e.preventDefault();
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
