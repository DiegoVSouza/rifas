import { User } from "./User";

export interface Raffle {
  id: string;
  name: string;
  image_link: string;
  city: string;
  price: number;
  total: number;
  sold: number;
  date_time: Date;
  numbers: Numbers[]
  winners?: User[];
}

export interface Numbers {
  number: number;
  token: string;
  sold: boolean;
  client?: User;
}

export interface RafflePag {
  Raffles: Raffle[];
  pages: number;
  total: number;
}

export interface RaffleGet {
  [key: string]: string | number | boolean | undefined;
  id?: string;
  name?: string;
  city?: string;
  price?: number;
  sorted_by?: string;
  limit?: number;
  page?: number;
}

export interface RafflePost {
  name: string;
  city: string;
  price: number;
  total: number;
  sold: number;
}

export interface RafflePut {
  id: string;
  name?: string;
  city?: string;
  price?: number;
  total?: number;
  sold?: number;
}

