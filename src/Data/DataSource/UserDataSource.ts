import { Token } from "../../Domain/Model/Token";
import { Admin, User, UserGet, UserPag, UserPost, UserPut } from "../../Domain/Model/User";

export default interface UserDataSource {
  getUsers(params:UserGet): Promise<UserPag>;
  getUsersQuota(params:UserGet): Promise<User[]>;
  postUsers(data:UserPost): Promise<User>;
  putUsers(data:UserPut): Promise<User>;
  deleteUsers(id:string): Promise<User>;
  loginAdmin(admin: Admin): Promise<boolean>;
}
