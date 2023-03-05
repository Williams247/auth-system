export interface User {
  id: string;
  email: string;
  password: string;
  username?: string;
  role?: string;
}

export enum UserTypeEnum {
  User = "User",
  Admin = "Admin",
}
