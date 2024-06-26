import { User, UserPost, UserPut } from "../../Domain/Model/User";

export default interface UserDataSource {
  getUsers(): Promise<User[]>;
  postUsers(data:UserPost): Promise<User>;
  putUsers(data:UserPut): Promise<User>;
  deleteUsers(id:string): Promise<User>;
}
