import React, { useEffect, useState } from 'react';
import './_itemSub.scss'
import { CheckIcon } from '@/Icons/icon_v1';
import { subType } from '@/model/subsModel';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { Bill } from '@/apis/Bill';
import { billModel, billType } from '@/model/billModel';
import { get_Day_in2_Date, minus_Date } from '@/util/time';
type Props = {
    sub: subType
    active?: boolean
    setDrop?: () => void
    setSub?: (value: subType) => void
}

const ItemSub = ({ sub, active = false, setDrop = () => { }, setSub = () => { } }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth)
    const [currentBillUser, set_CurrentBillUser] = useState<billType>(billModel.init)
    const [stateExpired, set_State] = useState(false)

    useEffect(() => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            if (sub?.Sub_Id != '' && sub?.Sub_Id != undefined) {
                Promise.all([
                    Bill.Get_Current(sub.Sub_Id)
                        .then((res) => {
                            if (res.status == 200) {
                                set_CurrentBillUser(res.data)
                            }
                        }),
                    Bill.Check_Bill_Id(sub.Sub_Id)
                        .then((res) => {
                            if (res.status == 200) {
                                set_State(res.data?.Bill)
                            }
                        })

                ])

            }
        }
    }, [sub, userProvider])


    return (
        <div className={`itemSub ${active && 'acticeItemSub'} ${stateExpired && 'acticeItemSub'}`} >

            <div className={`noitifiSub ${stateExpired && 'showNoitifiSub'}`}>
                <h1>{get_Day_in2_Date(new Date(currentBillUser.Expiration_Date), new Date()).toLocaleString()} day</h1>
            </div>
            <div className="headerItemPlan">
                <div className="titleSubPlan">
                    <h1>{sub?.Sub_Title}</h1>
                </div>
                <div className="priceSubPlan">
                    <div className="framePrice">
                        <h1>{sub?.Price != 0 ? `${sub?.Price}` : 'Free'}</h1>
                        <h4>{sub?.Price != 0 ? `vnd` : ''}</h4>
                    </div>

                    <h3>{sub?.Sub_Title.toLowerCase() != 'free' ? `${sub?.Duration}/day` : 'No limit/day'}</h3>
                </div>
            </div>
            <div className="bodyItemPlan">
                <div className="frameBtnPlan cursor_pointer">
                    <div className="btnPlan" onClick={() => {
                        if (!active) {
                            if (!stateExpired) {
                                setDrop()
                                setSub(sub)
                            }
                        }

                    }}>
                        {active ? 'Allready using' : stateExpired ? 'Allready using' : 'Select plan'}

                    </div>
                </div>


                <ul>
                    <li><CheckIcon w={20} /> <h3>{sub?.Content}</h3></li>
                    <li><CheckIcon w={20} /> <h3>Storage: {sub?.Storage} mb</h3></li>
                    <li><CheckIcon w={20} /> <h3>1GB</h3></li>
                    <li><CheckIcon w={20} /> <h3>1GB</h3></li>
                </ul>

            </div>
        </div>
    );
}

export default ItemSub;
