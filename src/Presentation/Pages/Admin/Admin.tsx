import { useEffect } from "react";
import './Admin.css'
import { Box } from "@chakra-ui/react";
import UserModel from "../../../main/models/UserModel";
import RaffleModel from "../../../main/models/RafflesModel";
import RaffleHolder from "../../Components/ProductHolder/RaffleHolder";

export default function Admin() {
  const {getRafflesPag} = RaffleModel()
  
  return (

    <main>
      <RaffleHolder limit={16} pagination />
    </main>
  );
}
