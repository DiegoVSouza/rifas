import { User } from "./User";

export interface Raffle {
  id: string;
  title: string;
  image_url: string;
  city: string;
  price: number;
  total: number;
  free: number;
  date: Date;
  quotas: Numbers[]
  winners?: User[];
  regulation: string;
  description: string;
}

export interface Numbers {
  id: string;
  raffle_id: string;
  number: number;
  free: boolean;
  user_id?: string;
  user?: User;
}

export interface NumbersPost {
  raffle_id: string;
  quotas: number[];
  user_id: string;
}

export interface RafflePag {
  raffles: Raffle[];
  pages: number;
  total: number;
}

export interface RaffleGet {
  [key: string]: string | number | boolean | [number,number] | undefined;
  id?: string;
  name?: string;
  city?: string;
  price?: number;
  sorted_by?: string;
  limit?: number;
  page?: number;
  avaliable?: boolean;
  prices?: [number,number]
}

export interface RafflePost {
  title: string;
  image_url: any;
  city: string;
  price: number;
  total: number;
  date: Date;
  regulation: string;
  description: string;
}

export interface WinnerPost {
  raffle_id: string;
  user_id: string;
  image_url: any;
}


export interface RafflePut {
  id: string;
  title?: string;
  image_url?: string;
  city?: string;
  price?: number;
  total?: number;
  date?: Date;
  numbers?: Numbers[]
  winners?: User[];
  regulation?: string;
  description?: string;
}

