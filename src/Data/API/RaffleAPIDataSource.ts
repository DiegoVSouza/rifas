import { RaffleGet, Raffle, RafflePag, RafflePost, RafflePut } from "../../Domain/Model/Raffle";
import RaffleDataSource from "../DataSource/RaffleDataSource";
import { api } from "../Services/api";


export default class RaffleAPIDataSourceImpl implements RaffleDataSource {
  async getRaffles(params?: RaffleGet): Promise<Raffle[]> {
    try {
      let url = '/Raffle';
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

      const { data } = await api.get(url);
      return data;
    } catch (error: any) {
      console.log(error);
      return [] as Raffle[];
    }
  }

  async getRafflesPag(params?: RaffleGet): Promise<RafflePag> {
    try {
      let url = '/Raffle/pag';
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

      const { data } = await api.get(url);
      return data;
    } catch (error: any) {
      console.log(error);
      return {} as RafflePag;
    }
  }

  async postRaffles(postData: RafflePost): Promise<Raffle> {
    try {
      const { data } = await api.post('/Raffle', postData)
      return data;
    } catch (error: any) {
      console.log(error.response.data)
      return {} as Raffle;
    }
  }
  async putRaffles(putData: RafflePut): Promise<Raffle> {
    try {
      const { data } = await api.put(`/Raffle/${putData.id}`, putData)
      return data;
    } catch (error: any) {
      console.log(error.response.data)
      return {} as Raffle;
    }
  }
  async deleteRaffles(RaffleId: string): Promise<Raffle> {
    try {
      const { data } = await api.delete(`/Raffle/${RaffleId}`)
      return data;
    } catch (error: any) {
      console.log(error.response.data)
      return {} as Raffle;
    }
  }



}
