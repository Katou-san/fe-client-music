
import React, { useEffect, useRef, useState } from 'react';
import './_changePass.scss'
import { changePass_userType, update_userType, userModel, userType } from '@/model/userModel';

import { User } from '@/apis/User';
import { toast } from 'react-toastify';
import { useReload } from '@/contexts/providerReload';
import { resetValidate } from '@/util/validate/authReset';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/redux/store';
import { hash64 } from '@/util/hash';
import { Eyes_Icon, HiddenEyes_Icon } from '@/Icons/icon_Figma';

type Props = {
    infoUser: userType
    is_Show: boolean,
    set_Show: () => void
    set_Reload: () => void
}
const EditFormPass = ({ infoUser, set_Show, is_Show, set_Reload }: Props) => {
    const { set_ReProfile } = useReload()
    const userProvider = useSelector((state: RootState) => state.auth)
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Load] = useState(false)
    const [valueChangePass, set_changePass] = useState<changePass_userType>(userModel.init_change_pass)
    const [showPassword, set_showPass] = useState({ pass: false, conPass: false, obpass: false });


    useEffect(() => {
        let handle = (e: any) => {
            if (itemRef.current && !itemRef.current.contains(e.target)) {
                set_Show();
            }
        };
        document.addEventListener("mousedown", handle);
        return () => {
            document.removeEventListener("mousedown", handle);
        };
    }, []);



    const onSubmitUpdatePass = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (infoUser.User_Id != '' && infoUser.User_Id != undefined && userProvider.is_Login && userProvider.Access_Token != '') {
            if (userProvider.User_Id == infoUser.User_Id) {
                if (!is_Loading) {
                    set_Load(true)
                    const checkError = resetValidate.changePass(valueChangePass)
                    if (!checkError.status) {
                        User.Change_Pass({ oldpass: hash64(valueChangePass.oldpass), pass: hash64(valueChangePass.pass), repass: hash64(valueChangePass.repass) }).then((res) => {
                            if (res.status == 200) {
                                toast.success(res.message)
                                set_Load(false)
                                set_Show()
                            } else {
                                toast.error(res.message)
                                set_Load(false)
                            }
                        })
                    } else {
                        let Arraykey = Object.keys(checkError.Error);
                        toast.error(checkError.Error[Arraykey[0]]);
                        set_Load(false)
                    }
                } else {
                    toast.warning('Please wait...');
                    set_Load(false)
                }
            } else {
                toast.warning('this is not you')
                set_Load(false)
            }

        } else {
            toast.warning('Error when get info ')
            set_Load(false)
        }

    }

    return (
        <div className={`frameChangePassUser ${is_Show && 'activeframeChangePassUser'}`} ref={itemRef}>
            <form action="" onSubmit={onSubmitUpdatePass}>
                <div className="formEdit">
                    <div className="Title">Change Pass</div>
                    <div className="contentFrame">
                        <div className="boxInput">
                            <input
                                type={`${showPassword.obpass ? 'text' : 'password'}`}
                                className="inputNamePlaylist"
                                placeholder="Current password"
                                value={valueChangePass.oldpass}
                                onChange={(e) => {
                                    set_changePass({ ...valueChangePass, oldpass: e.target.value })
                                }
                                }
                            />
                            <div className="frameIconPass" onClick={() => set_showPass({ ...showPassword, obpass: !showPassword.obpass })}>
                                {showPassword.obpass ? <HiddenEyes_Icon color="#000" /> : <Eyes_Icon color="#000" />}
                            </div>
                        </div>
                        <div className="boxInput">
                            <input
                                type={`${showPassword.pass ? 'text' : 'password'}`}
                                className="inputNamePlaylist"
                                placeholder="New password"
                                value={valueChangePass.pass}
                                onChange={(e) => {
                                    set_changePass({ ...valueChangePass, pass: e.target.value })
                                }
                                }
                            />
                            <div className="frameIconPass" onClick={() => set_showPass({ ...showPassword, pass: !showPassword.pass })}>
                                {showPassword.pass ? <HiddenEyes_Icon color="#000" /> : <Eyes_Icon color="#000" />}
                            </div>
                        </div>
                        <div className="boxInput">
                            <input
                                type={`${showPassword.conPass ? 'text' : 'password'}`}
                                className="inputNamePlaylist"
                                placeholder="Confirm new password"
                                value={valueChangePass?.repass}
                                onChange={(e) => {
                                    set_changePass({ ...valueChangePass, repass: e.target.value })
                                }}
                            />
                            <div className="frameIconPass" onClick={() => set_showPass({ ...showPassword, conPass: !showPassword.conPass })}>
                                {showPassword.conPass ? <HiddenEyes_Icon color="#000" /> : <Eyes_Icon color="#000" />}
                            </div>
                        </div>
                    </div>
                    <div className="footerModalPlaylist">
                        <div className="btnModal btnClose" onClick={set_Show}>
                            Close
                        </div>
                        <button type='submit' className="btnModal btnAction" >
                            Action
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditFormPass;
