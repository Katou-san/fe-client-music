export const EnvConfig = {
  NEXT_PUBLIC_CLIENT: " http://localhost:8080/api/v1",
  NEXT_PUBLIC_SEND: " http://localhost:8080/api/v1",
  // NEXT_PUBLIC_CLIENT: " https://31bd-14-186-154-17.ngrok-free.app/api/v1",
  // NEXT_PUBLIC_SEND: " https://31bd-14-186-154-17.ngrok-free.app/api/v1",

  NEXT_PUBLIC_SIGNUP: "/user/signup",
  NEXT_PUBLIC_LOGIN: "/user/login/client",
  NEXT_PUBLIC_AUTH: "/user/Oauth",
  NEXT_PUBLIC_PASS: "/user/password",
  NEXT_PUBLIC_USER: "/user",
  NEXT_PUBLIC_VISIT: "/visit",

  NEXT_PUBLIC_PROPOSE: "/trending",

  NEXT_PUBLIC_SONG: "/song",
  NEXT_PUBLIC_SONG_MANAGE: "/songs",

  NEXT_PUBLIC_FIND: "/audiofp/find",

  NEXT_PUBLIC_TRACK: "/track",

  NEXT_PUBLIC_SEARCH: "/searchs",
  NEXT_PUBLIC_SEARCH_TYPE: "/search-type",

  NEXT_PUBLIC_ROLE: "/role",
  NEXT_PUBLIC_ROLES: "/roles",

  NEXT_PUBLIC_REPOST: "/repost",
  NEXT_PUBLIC_REPOSTS: "/reposts",

  NEXT_PUBLIC_LIKE: "/like",
  NEXT_PUBLIC_LIKES: "/likes",

  NEXT_PUBLIC_COMMENT: "/comment",
  NEXT_PUBLIC_REPLY: "/reply",

  NEXT_PUBLIC_STORAGE: "/storage",

  NEXT_PUBLIC_CATEGORY: "/category",

  NEXT_PUBLIC_PLAYLIST: "/playlist",
  NEXT_PUBLIC_PLAYLIST_MANAGE: "/playlists",

  NEXT_PUBLIC_FOLLOW: "/follow",
  NEXT_PUBLIC_FOLLOWS: "/follows",

  NEXT_PUBLIC_EMPLOYESS: "/employess",

  NEXT_PUBLIC_BILL: "/bill",
  NEXT_PUBLIC_BILLS: "/bills",
  NEXT_PUBLIC_CHECK_BILLS: "/check-bill",

  NEXT_PUBLIC_SUBSCRIPTION: "/sub",

  NEXT_PUBLIC_GET_AVATAR: "/send/user/avatar",
  NEXT_PUBLIC_GET_AUDIO: "/send/audio",
  NEXT_PUBLIC_GET_IMAGE: "/send/image",
  NEXT_PUBLIC_GET_IMAGE_P: "/send/image_P",
  NEXT_PUBLIC_GET_THUMNAIL_P: "/send/thumbnail",
  NEXT_PUBLIC_GET_IMAGE_A: "/send/ads-image",
  NEXT_PUBLIC_GET_AUDIO_A: "/send/ads-audio",
  NEXT_PUBLIC_GET_LOGO: "/send/logo",

  NEXT_PUBLIC_ADS: "/ads",
  NEXT_PUBLIC_ADS_RANDOM: "/ads-random",

  NEXT_PUBLIC_PARTNER: "/partner",

  NEXT_PUBLIC_ARTIST: "/artist",
  NEXT_PUBLIC_ARTISTS: "/artists",
  NEXT_PUBLIC_ARTIST_SEARCH: "/artist-search",

  NEXT_PUBLIC_PAYMENT: "/pay",
  NEXT_PUBLIC_ZALO: "/zalopay",
  NEXT_PUBLIC_VNPAY: "/vnpay",

  NEXT_PUBLIC_LOGIN_GOOGLE: "/user/login-google",
  NEXT_PUBLIC_RESET_EMAIL: "/mail/send-reset",
  NEXT_PUBLIC_RESET: "/user/reset",
  LocalToken: "Access_Token",

  NEXT_PUBLIC_CLIENT_ID:
    "21616885819-vul8tpkrvs1rsopqb5dftdacdnnhqcn9.apps.googleusercontent.com",
};

export type EnvConfig_type = typeof EnvConfig;
