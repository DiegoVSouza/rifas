import { Admin, User, UserGet, UserPag, UserPost, UserPut } from "../../Domain/Model/User";
import { api } from "../Services/api";
import UserDataSource from "../DataSource/UserDataSource";
import { Token } from "../../Domain/Model/Token";


export default class UserAPIDataSourceImpl implements UserDataSource {
  async getUsersQuota(params: UserGet): Promise<User[]> {
    try {
      let url = '/quotas/users';
      let isFirstParam = true;

      if (params) {
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            if (value !== undefined && value !== null) {
              if (isFirstParam) {
                url += `?${key}=${value}`;
                isFirstParam = false;
              } else {
                url += `&${key}=${value}`;
              }
            }
          }
        }
      }
      const { data } = await api.get(url)

      console.log("data usersssssssssssssss",data)
      return data;
    } catch (error: any) {
      console.log(error)
      return [] as User[];
    }
  }
  async getUsers(params: UserGet): Promise<UserPag> {
    try {
      let url = '/users';
      let isFirstParam = true;

      if (params) {
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            if (value !== undefined && value !== null) {
              if (isFirstParam) {
                url += `?${key}=${value}`;
                isFirstParam = false;
              } else {
                url += `&${key}=${value}`;
              }
            }
          }
        }
      }
      const { data } = await api.get(url)
      return data;
    } catch (error: any) {
      console.log(error)
      return {} as UserPag;
    }
  }

  async postUsers(postData: UserPost): Promise<User> {
    try {
      const { data } = await api.post('/users', postData)
      return data;
    } catch (error: any) {
      console.log(error)
      return {} as User;
    }
  }
  async putUsers(putData: UserPut): Promise<User> {
    try {
      const { data } = await api.put(`/users/${putData.id}`, putData)
      return data;
    } catch (error: any) {
      console.log(error)
      return {} as User;
    }
  }
  async deleteUsers(user_id: string): Promise<User> {
    try {
      const { data } = await api.delete(`/users/${user_id}`)
      return data;
    } catch (error: any) {
      console.log(error)
      return {} as User;
    }
  }
  async loginAdmin(admin: Admin): Promise<boolean> {
    try {
      const { data } = await api.post(`/auth`, admin)
      if (data.accessToken) {
        localStorage.setItem("@token", data.accessToken);

        api.defaults.headers.common["x-access-token"] = data.accessToken;
        api.defaults.headers.common["authorization"] = `Bearer: ${data.accessToken}`

        return true
      } else {
        return false
      }
    } catch (error: any) {
      console.log(error)
        return false
    }
  }



}
