import { useEffect } from "react";
import './Admin.css'
import { Box } from "@chakra-ui/react";
import UserModel from "../../../main/models/UserModel";
import RaffleHolder from "../../Components/RaffleHolder/RaffleHolder";
import RaffleHolderAdmin from "../../Components/RaffleHolder/RaffleHolderAdmin";
import { RaffleModel } from "../../../main/hooks/useRaffleModel";

export default function Admin() {
  const { getRafflesPag } = RaffleModel()

  return (

    <main>
      <RaffleHolderAdmin limit={16} pagination />
    </main>
  );
}
