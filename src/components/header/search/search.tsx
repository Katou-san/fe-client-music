'use client'
import React, { useEffect, useState } from "react";
import "./_search.scss";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSearchProvider } from "@/hooks/redux/action/searchProvider";
import useDebounce from "@/hooks/customs/useDebounce";
export default function SearchBar() {
  const [searchValue, set_Search] = useState('')
  const debounceValue = useDebounce(searchValue, 500)
  const dispatch = useDispatch()
  const routes = useRouter()

  const handleSearch = () => {
    routes.push('/search')
  };

  useEffect(() => {
    dispatch(setSearchProvider(debounceValue.trim()))
  }, [debounceValue])
  return (
    <div
      className="inputSearch"
      id={searchValue.trim() === "" ? "notSearchValue" : "hasSearchValue"}
    >
      <SearchIcon color={"transparent"} />
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          set_Search(e.target.value)
        }}
      />
      <div className="btnSearch cursor-pointer" onClick={handleSearch}>
        Search
      </div>
    </div>
  );
}
