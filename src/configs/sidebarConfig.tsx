import { Playlist_Icon } from "@/Icons/icon_Figma";
import { HomeIcon, LikeIcon, RecommedIcon } from "@/Icons/icon_v1";

export const sidebarConfig = [
    {
        title: "Home",
        icons: <HomeIcon />,
        url: "#"
    },
    {
        title: "Trending",
        icons: <RecommedIcon />,
        url: "#"
    }
    ,
    {
        title: "Album",
        icons: <Playlist_Icon color="#fff" w={27} />,
        url: "#"
    }
]


export const sidebarLibraryConfig = [
    {
        title: "Favorite",
        icons: <LikeIcon />,
        url: "#"
    },
    {
        title: "Playlist",
        icons: <Playlist_Icon color="#fff" w={27} />,
        url: "#"
    }
]

export type SidebarType = typeof sidebarConfig[0]
