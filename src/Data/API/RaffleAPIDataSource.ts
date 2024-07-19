import { RaffleGet, Raffle, RafflePag, RafflePost, RafflePut, NumbersPost, Numbers, WinnerPost } from "../../Domain/Model/Raffle";
import RaffleDataSource from "../DataSource/RaffleDataSource";
import { api } from "../Services/api";


export default class RaffleAPIDataSourceImpl implements RaffleDataSource {
  async getRaffles(params?: RaffleGet): Promise<Raffle[]> {
    try {
      let url = '/raffles';
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
      let url = '/raffles';
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
      let raffles = [] as any[]
      if (data.raffles) {
        data.raffles.map((item: any) => {
          const { __quotas__, __winners__, ...restData } = item
          console.log(item)
          console.log(__quotas__)
          let newData = { ...restData, quotas: __quotas__, winners: __winners__ }
          raffles.push(newData)
        })

        data.raffles = raffles
      }

      return data;
    } catch (error: any) {
      console.log(error);
      return {} as RafflePag;
    }
  }

  async postRaffles(postData: RafflePost): Promise<Raffle> {
    try {
      let formData = new FormData();
      Object.entries(postData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await api.post('/raffles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // const { data } = await api.post('/raffles', postData)
      return data;
    } catch (error: any) {
      console.log(error)
      return {} as Raffle;
    }
  }
  async postQuotas(postData: NumbersPost): Promise<Numbers> {
    try {
      const { data } = await api.post('/raffles/quotas', postData)
      return data;
    } catch (error: any) {
      console.log(error)
      return {} as Numbers;
    }
  }

  async postWinner(postData: WinnerPost): Promise<Raffle> {
    try {
      let formData = new FormData();
      Object.entries(postData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await api.post('/raffles/winners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error: any) {
      console.log(error)
      return {} as Raffle;
    }
  }
  async putRaffles(putData: RafflePut): Promise<Raffle> {
    try {
      const { data } = await api.put(`/raffles/${putData.id}`, putData)
      return data;
    } catch (error: any) {
      console.log(error)
      return {} as Raffle;
    }
  }
  async deleteRaffles(raffle_id: string): Promise<Raffle> {
    try {
      const { data } = await api.delete(`/raffles/${raffle_id}`)
      return data;
    } catch (error: any) {
      console.log(error)
      return {} as Raffle;
    }
  }



}
