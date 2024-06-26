import { User } from "./User";

export interface Raffle {
  id: string;
  title: string;
  imageUrl: string;
  city: string;
  price: number;
  total: number;
  free: number;
  date: Date;
  numbers: Numbers[]
  winners?: User[];
  regulation: string;
  description: string;
}

export interface Numbers {
  id: string;
  number: number;
  free: boolean;
  userId?: string;
  user?: User;
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
  title: string;
  imageUrl: string;
  city: string;
  price: number;
  total: number;
  date: Date;
  regulation: string;
}

export interface RafflePut {
  id: string;
  title?: string;
  imageUrl?: string;
  city?: string;
  price?: number;
  total?: number;
  date?: Date;
  numbers?: Numbers[]
  winners?: User[];
  regulation?: string;
}

