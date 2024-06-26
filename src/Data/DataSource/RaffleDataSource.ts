import { RaffleGet, Raffle, RafflePag, RafflePost, RafflePut } from "../../Domain/Model/Raffle";

export default interface RaffleDataSource {
  getRaffles(params?: RaffleGet): Promise<Raffle[]>;
  getRafflesPag(params?: RaffleGet): Promise<RafflePag>;
  postRaffles(data:RafflePost): Promise<Raffle>;
  putRaffles(data:RafflePut): Promise<Raffle>;
  deleteRaffles(id:string): Promise<Raffle>;
}
