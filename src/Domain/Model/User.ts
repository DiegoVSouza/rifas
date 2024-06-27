export interface User {
  id: string
  name: string
  cpf: string
  phone: string
  city: string
  email?: string
  password?: string
  roleId?: string;
  role?: Role;
  imageUrl?: string;
}

interface Role{
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
  roleId?: string;
  role?: Role;
  imageUrl?: string;
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
  roleId?: string;
  role?: Role;
  imageUrl?: string;
}

