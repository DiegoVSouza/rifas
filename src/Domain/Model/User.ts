export interface User {
  id: string
  name: string
  cpf: string
  phone: number
  city?: string
  email?: string
  password?: string
  roleId?: string;
  role?: Role;
  imageUrl: string;
}

interface Role{
  id: string;
  value: string;
  label: string;
}


export interface UserPost {
  name: string
  cpf: string
  phone: number
  imageUrl: string;
}

export interface UserPut {
  id: string
  name?: string
  cpf?: string
  phone?: number
  imageUrl?: string;
}

