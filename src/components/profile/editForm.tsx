import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import imgTemp from '../../../public/temp.jpg'
import './_editForm.scss'
import { update_userType, userModel, userType } from '@/model/userModel';
import { URLValidate } from '@/util/validate/url';
import { Send } from '@/apis/Send';
import { authValidate } from '@/util/validate/authReq';
import { User } from '@/apis/User';
import { Form_Data } from '@/util/FormData/Form_Data';
import { toast } from 'react-toastify';

type Props = {
    infoUser: userType
    is_Show: boolean,
    set_Show: () => void
    set_Reload: () => void
}
const EditForm = ({ infoUser, set_Show, is_Show, set_Reload }: Props) => {
    const [change, set_Change] = useState<update_userType>(userModel.init_update)
    const itemRef = useRef<HTMLInputElement | null>(null);
    const [is_Loading, set_Load] = useState(false)
    const [user, set_user] = useState<userType>(infoUser)
    const [url, set_url] = useState('')

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


    useEffect(() => {
        if (infoUser?.Avatar != '' && infoUser?.Avatar != undefined) {
            if (URLValidate.isUrl(infoUser.Avatar)) {
                Send.Avatar(infoUser.Avatar)
                    .then((res) => set_url(URL.createObjectURL(res)))
            } else {
                set_url(infoUser.Avatar)
            }
        }
        set_user(infoUser)
    }, [infoUser])

    const onSubmitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!is_Loading) {
            set_Load(true)
            const checkError = authValidate.update(infoUser.User_Name || '', change?.Phone == infoUser.Phone ? 'null' : change?.Phone || '')
            if (!checkError.status) {
                if (user.User_Id) {
                    User.Update(user.User_Id, Form_Data(change, ['User_Id', 'User_Email', 'is_Admin', 'is_Premium']))
                        .then((res) => {
                            if (res.status == 200) {
                                toast.success(res.message)
                                set_Load(false)
                                set_Show();
                                set_Reload()
                            } else {
                                toast.error(res.message)
                                set_Load(false)
                            }
                        })
                    set_Load(false)
                } else {
                    toast.error('Id user is emty');
                    set_Load(false)
                }
            } else {
                let Arraykey = Object.keys(checkError.Error);
                toast.error(checkError.Error[Arraykey[0]]);
                set_Load(false)
            }
        } else {
            toast.warning('Please wait...');
        }
    }

    return (
        <div className={`frameEditUser ${is_Show && 'activeframeEditUser'}`} ref={itemRef}>
            <div className="formEdit">
                <div className="Title">Update user</div>
                <form action="" encType="multipart/form-data" onSubmit={onSubmitUpdate} >
                    <div className="contentImage">
                        <div className="frameImage">
                            <Image alt='' src={url || imgTemp} width={100} height={100} />
                        </div>
                        <div className="labelContent">
                            <label htmlFor="changeAvatar">Change avartar</label>
                        </div>

                        <input type="file" id='changeAvatar' typeof='image/*' className='none' onChange={(e) => {
                            if (e.target?.files != null) {
                                set_url(URL.createObjectURL(e.target.files[0]))

                                set_Change({ ...change, Avatar: e.target.files[0] })
                            }
                        }} />
                    </div>

                    <div className="contentFrame">
                        <input
                            type="text"
                            className="inputNamePlaylist"
                            placeholder="Name"
                            value={user.User_Name}
                            onChange={(e) => {
                                set_user({ ...user, User_Name: e.target.value })
                                set_Change({ ...change, User_Name: e.target.value })
                            }

                            }
                        />
                        <input
                            type="text"
                            className="inputNamePlaylist"
                            placeholder="Phone"
                            value={user.Phone}
                            onChange={(e) => {
                                set_user({ ...user, Phone: e.target.value })
                                set_Change({ ...change, Phone: e.target.value })
                            }
                            }
                        />
                        <div className="lableColor" >
                            <label htmlFor="colorUser" style={{ backgroundColor: `${user.Color}` }}>Color</label>
                        </div>
                        <input
                            type="color"
                            className="none"
                            placeholder="Phone"
                            id='colorUser'
                            value={""}
                            onChange={(e) => {
                                set_user({ ...user, Color: e.target.value })
                                set_Change({ ...change, Color: e.target.value })
                            }
                            }
                        />
                    </div>
                    <div className="footerModalPlaylist">
                        <div className="btnModal btnClose" onClick={set_Show}>
                            Close
                        </div>
                        <button type='submit' className="btnModal btnAction" >
                            Action
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default EditForm;
