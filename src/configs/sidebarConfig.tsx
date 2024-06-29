import { List2_Icon, Playlist_Icon } from "@/Icons/icon_Figma";
import { HomeIcon, LikeIcon, RecommedIcon } from "@/Icons/icon_v1";

export const sidebarConfig = [
    {
        title: "Home",
        icons: <HomeIcon />,
        url: "/"
    },
    {
        title: "Trending",
        icons: <RecommedIcon />,
        url: "/trending"
    }
    ,
    {
        title: "Album",
        icons: <Playlist_Icon color="#fff" w={27} />,
        url: "/album"
    }
]


export const sidebarLibraryConfig = [
    {
        title: "Favorite",
        icons: <LikeIcon />,
        url: "/favorite"
    },
    {
        title: "Playlist",
        icons: <List2_Icon />,
        url: "/playlist"
    }
]

export type SidebarType = typeof sidebarConfig[0]
