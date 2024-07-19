import { Navigate } from "react-router-dom";
import UserModel from "../models/UserModel";
import { useEffect, useState } from "react";
import Admin from "../../Presentation/Pages/Admin/Admin";
import LoadingSpinner from "../../Presentation/Components/Notification/LoadingSpinner";

export const AdminRouteChecker: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const { loginAdmin } = UserModel()
  const token = localStorage.getItem("@token");
  let firstTime = true
  let i = 0
  const isAuthenticated = async () => {
    const email = window.prompt('Digite seu email:');
    const password = window.prompt('Digite sua senha:');
    i++
    console.log("entrou", i)
    if (email  && password ) {
      let admin = { email, password }
      let data = await loginAdmin(admin)
      setIsAdmin(data)
    } else {
      setIsAdmin(false)
    }
  };
  useEffect(() => {
    if (!token) {
      if(firstTime){
        isAuthenticated()
        firstTime = false
        setTimeout(() => window.location.reload(), 1000)
      }
    }else{
      setIsAdmin(true)
    }
  }, [])

  if (isAdmin === null) {
    return <LoadingSpinner />;
  }


  return isAdmin ? <Admin /> : <Navigate to="/home" />;
};