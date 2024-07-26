import React, { useEffect, useState } from 'react';
import './_itemSub.scss'
import { CheckIcon } from '@/Icons/icon_v1';
import { subModel, subType } from '@/model/subsModel';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { Payment } from '@/apis/Payment';
import { toast } from 'react-toastify';
import { Bill } from '@/apis/Bill';
import { billModel, billType } from '@/model/billModel';
type Props = {
    sub: subType
    active?: boolean
}

const ItemSub = ({ sub, active = false }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth)
    const [currentBillUser, set_CurrentBillUser] = useState<billType>(billModel.init)
    const handlePayment = () => {
        if (userProvider.Access_Token != '' && userProvider.is_Login && sub?.Sub_Id != '' && sub?.Sub_Id != undefined) {
            Payment.VNPay_payment(sub.Sub_Id)
                .then((res) => {
                    if (res.status == 200) {
                        window.open(res.data.order_url)
                    } else {
                        toast.error(res.message)
                    }
                })
        }
    }

    useEffect(() => {
        if (userProvider.Access_Token != '' && userProvider.is_Login) {
            if (sub?.Sub_Id != '' && sub?.Sub_Id != undefined) {
                Bill.Get_Current(sub.Sub_Id)
                    .then((res) => {
                        if (res.status == 200) {
                            set_CurrentBillUser(res.data)
                        }
                    })
            }
        }
    }, [sub])

    return (
        <div className={`itemSub ${active && 'acticeItemSub'} ${currentBillUser.Sub_Id == sub.Sub_Id && 'acticeItemSub'}`} >
            <div className="headerItemPlan">
                <div className="titleSubPlan">
                    <h1>{sub?.Sub_Title}</h1>
                </div>
                <div className="priceSubPlan">
                    <h1>{sub?.Price != 0 ? `${sub?.Price}$` : 'Free'}</h1>
                    <h3>/month</h3>
                </div>
            </div>
            <div className="bodyItemPlan">
                <div className="frameBtnPlan cursor_pointer">
                    <div className="btnPlan" onClick={() => {
                        if (!active) {
                            if (currentBillUser.Sub_Id != sub.Sub_Id) {
                                handlePayment()
                            }
                        }

                    }}>
                        {active ? 'Allready using' : currentBillUser.Sub_Id == sub.Sub_Id ? 'Allready using' : 'Select plan'}

                    </div>
                </div>


                <ul>
                    <li><CheckIcon w={20} /> <h3>{sub?.Content}</h3></li>
                    <li><CheckIcon w={20} /> <h3>1GB</h3></li>
                    <li><CheckIcon w={20} /> <h3>1GB</h3></li>
                    <li><CheckIcon w={20} /> <h3>1GB</h3></li>
                </ul>

            </div>
        </div>
    );
}

export default ItemSub;
