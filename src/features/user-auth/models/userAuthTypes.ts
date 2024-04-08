export type UserPostType = {
  access: string;
};

export type UserReturnType = {
  id: number;
};

export type LoginPostType = {
  email: string;
  password: string;
};

export type LoginReturnType = {
  refresh: string;
  access: string;
};
