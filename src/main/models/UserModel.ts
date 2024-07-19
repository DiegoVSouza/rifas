import { useEffect, useState } from "react";
import { Admin, User, UserGet, UserPag, UserPost, UserPut } from "../../Domain/Model/User";

import UserAPIDataSourceImpl from "../../Data/API/UserAPIDataSource";
import { mockUsers } from "./RafflesMockup";

export default function UserModel() {
  const [Users, setUsers] = useState<User[]>([]);
  const [UsersQuotas, setUsersQuotas] = useState<User[]>([]);
  const [UsersPag, setUsersPag] = useState<Omit<UserPag, 'users'>>({} as Omit<UserPag, 'users'>);
  const [User, setUser] = useState<User>();

  const usersDataSourceImpl = new UserAPIDataSourceImpl();

  async function getUsers(params: UserGet) {
    let data = await usersDataSourceImpl.getUsers(params)
    const { users, ...restData } = data
    setUsers(users);
    setUsersPag(restData)
  }

  async function getUsersQuota(params: UserGet) {
    let data = await usersDataSourceImpl.getUsersQuota(params)
    setUsersQuotas(data);
  }
  async function postUsers(data: UserPost) {
    setUser(await usersDataSourceImpl.postUsers(data));
  }
  async function putUsers(data: UserPut) {
    setUser(await usersDataSourceImpl.putUsers(data));
  }
  async function deleteUsers(id: string) {
    setUser(await usersDataSourceImpl.deleteUsers(id));
  }

  async function loginAdmin(admin: Admin) {
    let data = await usersDataSourceImpl.loginAdmin(admin)
    return data
  }

  function onChangeValue(id: String, isWinner?: boolean) {
    let user = undefined
    if (isWinner)
      user = UsersQuotas.find(item => item.id === id)
    else
      user = Users.find(item => item.id === id)

    setUser(user);
  }

  return {
    getUsers,
    getUsersQuota,
    postUsers,
    putUsers,
    deleteUsers,
    onChangeValue,
    loginAdmin,
    Users,
    UsersQuotas,
    UsersPag,
    User
  };
}
