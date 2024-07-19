import { ReactNode, createContext, useContext, useState } from "react";
import RaffleAPIDataSourceImpl from "../../Data/API/RaffleAPIDataSource";
import { Raffle, RaffleGet, RafflePost, RafflePut, RafflePag, NumbersPost, WinnerPost } from "../../Domain/Model/Raffle";
import { mockRaffles } from "../models/RafflesMockup";
import { User } from "../../Domain/Model/User";

interface RaffleContextProps {
  getRaffles(params?: RaffleGet): Promise<void>
  getRafflesPag(params?: RaffleGet,forWinners?: boolean): Promise<void>
  postRaffles(data: RafflePost): Promise<void>
  postQuotas(data: NumbersPost): Promise<void>
  postWinner(data: WinnerPost): Promise<void>
  putRaffles(data: RafflePut): Promise<void>
  deleteRaffles(id: string): Promise<void>
  onChangeValue(id: string): void
  Raffles: Raffle[]
  Winners: any[]
  RafflesPag: Omit<RafflePag, 'raffles'>
  Raffle: Raffle | undefined
}

interface Props {
  children: ReactNode;
}

const RaffleContext = createContext({} as RaffleContextProps);

function RaffleProvider({ children }: Props) {
  const [Raffles, setRaffles] = useState<Raffle[]>([]);
  const [Winners, setWinners] = useState<any[]>([]);
  const [RafflesPag, setRafflesPag] = useState<Omit<RafflePag, 'raffles'>>({} as Omit<RafflePag, 'raffles'>);
  const [Raffle, setRaffle] = useState<Raffle>();

  const RafflesDataSourceImpl = new RaffleAPIDataSourceImpl();


  async function getRaffles(params?: RaffleGet) {
    let data = await RafflesDataSourceImpl.getRaffles(params)
    setRaffles(data);
  }
  async function getRaffle(params?: RaffleGet) {
    // let data = await RafflesDataSourceImpl.getRaffles(params)
    let data = mockRaffles.filter(item => item.id === params?.id)
    setRaffle(data[0]);
  }
  async function getRafflesPag(params?: RaffleGet, forWinners?: boolean) {
    let data = await RafflesDataSourceImpl.getRafflesPag(params)
    const { raffles, ...restData } = data
    setRafflesPag(restData);
    setRaffles(raffles);

    if (forWinners) {
      let users = [] as any[]
      raffles.map(item => {
        if (item.winners)
          users.push({ ...item.winners[0], raffle_tittle: item.title })
      })

      setWinners(users)
    }

  }
  async function postRaffles(data: RafflePost) {
    setRaffle(await RafflesDataSourceImpl.postRaffles(data));
  }
  async function postWinner(data: WinnerPost) {
    setRaffle(await RafflesDataSourceImpl.postWinner(data));
  }
  async function postQuotas(data: NumbersPost) {
    await RafflesDataSourceImpl.postQuotas(data)
  }
  async function putRaffles(data: RafflePut) {
    setRaffle(await RafflesDataSourceImpl.putRaffles(data));
  }
  async function deleteRaffles(id: string) {
    await RafflesDataSourceImpl.deleteRaffles(id)
  }

  function onChangeValue(id: String) {
    let raffle = Raffles.find(item => item.id === id)
    setRaffle(raffle);
  }


  return (
    <RaffleContext.Provider value={{
      getRaffles,
      getRafflesPag,
      postRaffles,
      postWinner,
      postQuotas,
      putRaffles,
      deleteRaffles,
      onChangeValue,
      Raffles,
      Winners,
      RafflesPag,
      Raffle
    }}>
      {children}
    </RaffleContext.Provider>
  );

}

const RaffleModel = (): RaffleContextProps => {
  const context = useContext(RaffleContext);

  if (!context) {
    throw new Error("");
  }

  return context;
};

export { RaffleModel, RaffleProvider };

