const list_initLike = [
  {
    Topic_Id: "",
    State: 0,
    User_Id: "",
    Type: 0,
  },
];

export const likeModel = {
  init: list_initLike[0],
  init_list: list_initLike,
};

export type likeType = (typeof list_initLike)[0];
export type list_likeType = typeof list_initLike;
