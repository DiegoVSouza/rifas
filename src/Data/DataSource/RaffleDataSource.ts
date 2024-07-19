import { RaffleGet, Raffle, RafflePag, RafflePost, RafflePut, NumbersPost, Numbers, WinnerPost } from "../../Domain/Model/Raffle";

export default interface RaffleDataSource {
  getRaffles(params?: RaffleGet): Promise<Raffle[]>;
  getRafflesPag(params?: RaffleGet): Promise<RafflePag>;
  postRaffles(data:RafflePost): Promise<Raffle>;
  postWinner(data:WinnerPost): Promise<Raffle>;
  postQuotas(data:NumbersPost): Promise<Numbers>;
  putRaffles(data:RafflePut): Promise<Raffle>;
  deleteRaffles(id:string): Promise<Raffle>;
}
