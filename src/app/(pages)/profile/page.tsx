'use client'
import React, { useEffect, useState } from "react";
import './_profile.scss'
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { userModel, userType } from "@/model/userModel";
import Image from "next/image";
import { User } from "@/apis/User";
import { URLValidate } from "@/util/validate/url";
import { Send } from "@/apis/Send";
import imgTemp from '../../../../public/temp.jpg'
import { Check_Icon, Follow_Icon, Sound_Icon } from "@/Icons/icon_Figma";
import ItemPost from "@/components/profile/itemPost";
import { useSearchParams } from "next/navigation";
import { Repost } from "@/apis/Repost";
import { list_repostType } from "@/model/repostModel";
import { followModel, followType } from "@/model/followModel";
import { Follow } from "@/apis/Follow";
import EditForm from "@/components/profile/editForm";
import { useReload } from "@/contexts/providerReload";
import { toast } from "react-toastify";
import { CheckIcon } from "@/Icons/icon_v1";
import { Role } from "@/apis/Role";
import { roleModel } from "@/model/roleModel";
const Page = () => {
  const { set_ReFollow, re_follow, re_profile } = useReload()
  const [showEdit, set_ShowEdit] = useState(false)
  const [Reload, set_Reload] = useState(false)
  const { re_repost } = useReload()
  const userProvider = useSelector((state: RootState) => state.auth)
  const [listRepost, set_ListRepost] = useState<list_repostType>([])
  const [infoUser, set_Info] = useState<userType>(userModel.init)
  const [follow, set_follow] = useState(followModel.init_res)
  const [inforole, set_infoRole] = useState(roleModel.init)
  const [currentFollow, set_CurrentFollow] = useState<followType>(followModel.init)
  const [url, set_url] = useState('')
  const seachParam = useSearchParams();
  const UserId = seachParam.get("id");

  useEffect(() => {
    if (UserId != undefined && UserId != null && UserId != '') {
      Promise.all([
        User.Get_Id(UserId)
          .then((res) => set_Info(res.data))
      ])
    }
  }, [UserId, re_profile])



  useEffect(() => {
    if (infoUser?.Avatar != '' && infoUser?.Avatar != undefined) {
      if (URLValidate.isUrl(infoUser.Avatar)) {
        Send.Avatar(infoUser.Avatar)
          .then((res) => set_url(URL.createObjectURL(res)))
      } else {
        set_url(infoUser.Avatar)
      }

      if (infoUser?.User_Id != '') {
        Role.Get_Id(infoUser.Role_Id)
          .then((res) => {
            if (res.status == 200) {
              set_infoRole(res.data)
            }
          })
      }
    }
  }, [infoUser])


  useEffect(() => {
    if (UserId != undefined && UserId != null && UserId != '') {
      Repost.Get_Id(UserId)
        .then((res) => {
          if (res.status == 200) {
            set_ListRepost(res.data)
          }
        })
    }
  }, [UserId, re_repost])

  useEffect(() => {
    if (UserId != undefined && UserId != null && UserId != '') {
      Promise.all([
        Follow.Get_Follow(UserId)
          .then((res) => {
            if (res.status == 200) {
              set_follow(res.data)
            }
          }),
        Follow.Get_Current(UserId)
          .then((res) => {
            if (res.status == 200) {
              set_CurrentFollow(res.data)
            } else {
              set_CurrentFollow(followModel.init)
            }
          })
      ])

    }
  }, [re_follow])


  const handleFollow = () => {
    if (userProvider.User_Id != undefined && userProvider.User_Id != '' && UserId != '' && UserId != undefined) {
      if (currentFollow.Follower != '') {
        Follow.Delete(UserId)
          .then((res) => {
            if (res.status == 200) {
              toast.success(res.message)
              set_ReFollow()
            } else {
              toast.error(res.message)
            }
          })
      } else
        Follow.Create({ Following: infoUser.User_Id })
          .then((res) => {
            if (res.status == 200) {
              toast.success(res.message)
              set_ReFollow()
            } else {
              toast.error(res.message)
            }
          })
    }
  }

  return <div className="frameProfile">
    <div className="headerProfile">
      <div className="background">
        <div className="frameImg">
          <Image alt="" src={url || imgTemp} width={150} height={150} />
        </div>
      </div>
      <div className="infoUser">
        {userProvider.User_Id != UserId &&
          <div className="frameOption">
            {currentFollow.Follower == userProvider.User_Id &&
              <div className="frameFollow frameFollowed" onClick={handleFollow}>
                <><CheckIcon w={17} />
                  <h1>Followed</h1></>
              </div>}
            {currentFollow.Follower != userProvider.User_Id &&
              <div className="frameFollow" onClick={handleFollow}>
                <><Follow_Icon w={17} />
                  <h1>Follow</h1></>
              </div>}
          </div>}
        {userProvider.User_Id == UserId && <div className="frameOption" >
          <div className="editProfile" onClick={() => set_ShowEdit(true)}>Edit profile</div>
        </div>}

        <div className="frameName">
          <h1>{infoUser?.User_Name}</h1>
          <span>{infoUser?.is_Premium ? inforole.Role_Name == 'creator' ? <Sound_Icon w={30} /> : <Check_Icon w={30} /> : ''} </span>
        </div>
        <div className="frameId">
          <h1>{infoUser?.User_Email}</h1>
        </div>
        <div className="frameCreate">
          <h1>create date: {new Date(infoUser?.Create_date).toLocaleDateString()}</h1>
        </div>
        <div className="frameFollow">
          <div className="following">
            <span>{follow?.Following.length}</span> follwing
          </div>
          <div className="follower">
            <span>{follow?.Follower.length}</span> follwer
          </div>
        </div>
      </div>


    </div>
    <div className="bodyProfile">
      <div className="titleBody">
        <h1>Posts</h1>
      </div>
      <div className="listPost">
        {listRepost.length == 0 && <div className="loading">No repost</div>}
        {listRepost.length > 0 && listRepost.map((post, index) => <ItemPost key={index} post={post} />)}
      </div>
    </div>
    <EditForm infoUser={infoUser} is_Show={showEdit} set_Show={() => set_ShowEdit(false)} set_Reload={() => set_Reload(prev => !prev)} />
  </div>
};

export default Page;
