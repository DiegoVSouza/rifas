import { User, UserPost, UserPut } from "../../Domain/Model/User";
import { api } from "../Services/api";
import UserDataSource from "../DataSource/UserDataSource";


export default class UserAPIDataSourceImpl implements UserDataSource {
  async getUsers(): Promise<User[]> {
    try {
      const { data } = await api.get('/user')
      return data;
    } catch (error: any) {
      console.log(error.response.data)
      return [] as User[];
    }
  }

  async postUsers(postData: UserPost): Promise<User> {
    try {
      const { data } = await api.post('/user', postData)
      return data;
    } catch (error: any) {
      console.log(error.response.data)
      return {} as User;
    }
  }
  async putUsers(putData: UserPut): Promise<User> {
    try {
      const { data } = await api.put(`/User/${putData.id}`, putData)
      return data;
    } catch (error: any) {
      console.log(error.response.data)
      return {} as User;
    }
  }
  async deleteUsers(UserId:string): Promise<User> {
    try {
      const { data } = await api.delete(`/User/${UserId}`)
      return data;
    } catch (error: any) {
      console.log(error.response.data)
      return {} as User;
    }
  }



}
