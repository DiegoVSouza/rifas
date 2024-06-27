import { useEffect, useState } from "react";
import RaffleAPIDataSourceImpl from "../../Data/API/RaffleAPIDataSource";
import { Raffle, RafflePag, RaffleGet, RafflePost, RafflePut } from "../../Domain/Model/Raffle";
import { mockRaffles } from "./RafflesMockup";


export default function RaffleModel() {
  const [Raffles, setRaffles] = useState<Raffle[]>([]);
  const [RafflesPag, setRafflesPag] = useState<Omit<RafflePag, 'Raffles'>>({} as Omit<RafflePag, 'Raffles'>);
  const [Raffle, setRaffle] = useState<Raffle>();

  const RafflesDataSourceImpl = new RaffleAPIDataSourceImpl();


  async function getRaffles(params?: RaffleGet) {
    setRaffles(await RafflesDataSourceImpl.getRaffles(params));
  }
  async function getRaffle(params?: RaffleGet) {
    // let data = await RafflesDataSourceImpl.getRaffles(params)
    let data = mockRaffles.filter(item=> item.id === params?.id)
    setRaffle(data[0]);
  }
  async function getRafflesPag(params?: RaffleGet) {
    let data = await RafflesDataSourceImpl.getRafflesPag(params)
    const { Raffles, ...restData } = data
    setRafflesPag(restData);
    setRaffles(mockRaffles);
  }
  async function postRaffles(data: RafflePost) {
    setRaffle(await RafflesDataSourceImpl.postRaffles(data));
  }
  async function postQuotas(data: RafflePost) {
    setRaffle(await RafflesDataSourceImpl.postRaffles(data));
  }
  async function putRaffles(data: RafflePut) {
    setRaffle(await RafflesDataSourceImpl.putRaffles(data));
  }
  async function deleteRaffles(id: string) {
    setRaffle(await RafflesDataSourceImpl.deleteRaffles(id));
  }

  function onChangeValue(id: String) {
    let Raffle = Raffles.find(item=> item.id === id)
    setRaffle(Raffle);
  }

  return {
    getRaffles,
    getRaffle,
    getRafflesPag,
    postRaffles,
    postQuotas,
    putRaffles,
    deleteRaffles,
    onChangeValue,
    Raffles,
    RafflesPag,
    Raffle
  };
}
