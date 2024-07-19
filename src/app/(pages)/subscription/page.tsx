'use client'
import React from "react";
import "./_subscription.scss"
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import ItemSub from "@/components/subcription/itemSub";
const Page = () => {
  const userProvider = useSelector((state: RootState) => state.auth)
  const temp = [1, 2, 3]

  return <div className="frameSup">
    <div className="headerSub">
      <div className="titleSub">this is a subscription page</div>
      <div className="subTitleSub">sub title</div>
    </div>
    <div className="ContentSub">
      <div className="listSub">
        {temp.map((item, index) =>
          <ItemSub key={index} />
        )}
      </div>
    </div>
  </div>
};

export default Page;
