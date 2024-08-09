"use client";
import { RootState } from "@/hooks/redux/store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./_paymentModal.scss";
import { LoadingSVGWatting } from "@/Icons/Loading";
import { LogoVNPAY, LogoZALO } from "@/Icons/icon_Logo";
import { subType } from "@/model/subsModel";
import { billModel, billType, list_billType } from "@/model/billModel";
import { Payment } from "@/apis/Payment";
import { toast } from "react-toastify";
import { Bill } from "@/apis/Bill";
type Props = {
    drop_Down: boolean;
    set_Drop: () => void;
    style?: React.CSSProperties
    sub: subType
};

const PaymentModalDropDown = ({ drop_Down, set_Drop, style, sub }: Props) => {
    const userProvider = useSelector((state: RootState) => state.auth);
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Loading] = useState(false)
    const [currentBillUser, set_CurrentBillUser] = useState<billType>(billModel.init)
    const [checkBill, set_CheckBill] = useState(false)

    useEffect(() => {
        let handle = (e: any) => {
            if (itemRef.current && !itemRef.current.contains(e.target)) {
                set_Drop();
            }
        };
        document.addEventListener("mousedown", handle);
        return () => {
            document.removeEventListener("mousedown", handle);
        };
    }, []);


    const handlePayment = () => {
        if (userProvider.Access_Token != '' && userProvider.is_Login && sub?.Sub_Id != '' && sub?.Sub_Id != undefined) {
            if (!checkBill) {
                Payment.VNPay_payment(sub.Sub_Id)
                    .then((res) => {
                        if (res.status == 200) {
                            window.open(res.data.order_url, '', "width=600,height=700")
                            console.log(res.data)
                        } else {
                            toast.error(res.message)
                        }
                    })
            } else {
                toast.warning('You have a subscription')
            }

        } else {
            toast.error('You need login')
        }
    }

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
                    Bill.Check_Bill()
                        .then(res => {
                            if (res.status == 200) {
                                console.log(res.data)
                                set_CheckBill(res.data?.Bill)
                            }
                        })
                ])

            }
        }
    }, [sub])



    return (
        <div
            className={`dropDownPayment ${drop_Down && "activeDropDownPayment"}`}
            style={style}
            ref={itemRef}
        >
            {is_Loading && <div className="frameLoading">
                <LoadingSVGWatting w={70} />
            </div>}
            {!is_Loading && <>
                <h1>Option Payment</h1>
                <ul>
                    <li className="btnOption Zalo" onClick={handlePayment}>
                        <div className="frameIcon">
                            <LogoZALO w={40} />
                        </div>
                        <div className="Name">
                            ZaloPay
                        </div>
                    </li>
                    <li className="btnOption VNPay">
                        <div className="frameIcon">
                            <LogoVNPAY w={40} />
                        </div>
                        <div className="Name">
                            <span>VN</span><span>Pay</span>
                        </div>
                    </li>
                </ul> </>}
        </div>
    );
};

export default PaymentModalDropDown;
