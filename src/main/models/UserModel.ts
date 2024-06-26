import { useEffect, useState } from "react";
import { User, UserPost, UserPut } from "../../Domain/Model/User";

import UserAPIDataSourceImpl from "../../Data/API/UserAPIDataSource";

export default function UserModel() {
  const [Users, setUsers] = useState<User[]>([]);
  const [User, setUser] = useState<User>();

  const usersDataSourceImpl = new UserAPIDataSourceImpl();

  async function getUsers() {
    setUsers(await usersDataSourceImpl.getUsers());
  }
  async function postUsers(data:UserPost) {
    setUser(await usersDataSourceImpl.postUsers(data));
  }
  async function putUsers(data:UserPut) {
    setUser(await usersDataSourceImpl.putUsers(data));
  }
  async function deleteUsers(id:string) {
    setUser(await usersDataSourceImpl.deleteUsers(id));
    await getUsers()
  }

  function onChangeValue(id: String) {
    let User = Users.find(item=> item.id === id)
    setUser(User);
  }

  return {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    onChangeValue,
    Users,
    User
  };
}
