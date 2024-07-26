'use client'
import React, { useEffect, useState } from "react";
import "./_subscription.scss"
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import ItemSub from "@/components/subcription/itemSub";
import { Subcription } from "@/apis/Subscription";
import { list_subType, subType } from "@/model/subsModel";
import { freeSubscription } from "@/configs/subConfig";
const Page = () => {
  const userProvider = useSelector((state: RootState) => state.auth)
  const [listSub, set_ListSub] = useState<list_subType>([])
  const temp = [1, 2, 3]

  useEffect(() => {
    Subcription.Get_Sub()
      .then((res) => {
        if (res.status == 200) {
          set_ListSub(res.data)
        }

      })
  }, [])

  return <div className="frameSup">
    <div className="headerSub">
      <div className="titleSub">this is a subscription page</div>
      <div className="subTitleSub">sub title</div>
    </div>
    <div className="ContentSub">
      <div className="listSub">
        <ItemSub sub={freeSubscription} active={true} />
        {listSub.map((item, index) =>
          <ItemSub key={index} sub={item} />
        )}
      </div>
    </div>
  </div>
};

export default Page;
