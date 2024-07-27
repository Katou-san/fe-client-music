'use client'
import React, { useEffect, useState } from "react";
import "./_subscription.scss"
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import ItemSub from "@/components/subcription/itemSub";
import { Subcription } from "@/apis/Subscription";
import { list_subType, subModel, subType } from "@/model/subsModel";
import { freeSubscription } from "@/configs/subConfig";
import PaymentModalDropDown from "@/components/customs/modal/Payment/paymentModal";
const Page = () => {
  const userProvider = useSelector((state: RootState) => state.auth)
  const [drop_Down, set_Drop] = useState(false)
  const [listSub, set_ListSub] = useState<list_subType>([])
  const [selectSub, set_SelectSub] = useState<subType>(subModel.init)

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
          <ItemSub key={index} sub={item} setDrop={() => set_Drop(true)} setSub={(value: subType) => set_SelectSub(value)} />
        )}
      </div>
    </div>
    <PaymentModalDropDown sub={selectSub} drop_Down={drop_Down} set_Drop={() => set_Drop(false)} style={{ top: '30%', left: 'calc(50% - 200px)' }} />
  </div>
};

export default Page;
