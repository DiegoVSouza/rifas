export interface User {
  id: string
  name: string
  cpf: string
  phone: string
  city: string
  email?: string
  password?: string
  role_id?: string;
  role?: Role;
  image_url?: string;
}

export interface Admin {
  email: string;
  password: string;
}

interface Role {
  id: string;
  value: string;
  label: string;
}


export interface UserPost {
  name: string
  cpf: string
  phone: string
  city: string
  email?: string
  password?: string
  role_id?: string;
  role?: Role;
  image_url?: string;
}

export interface UserPag {
  users: User[];
  pages: number;
  total: number;
}

export interface UserGet {
  [key: string]: string | number | boolean | undefined;
  raffle_id?: string;
  name?: string
  cpf?: string
  phone?: string
  limit?: number;
  page?: number;
}

export interface UserSchema {
  name: string
  cpf: string
  phone: string
}

export interface UserPut {
  id: string
  name?: string
  cpf?: string
  phone?: string
  city?: string
  email?: string
  password?: string
  role_id?: string;
  role?: Role;
  image_url?: string;
}

