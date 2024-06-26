export interface User {
  id: string
  name: string
  cpf: string
  phone: number
  image_link: string;
}


export interface UserPost {
  name: string
  cpf: string
  phone: number
  image_link: string;
}

export interface UserPut {
  id: string
  name?: string
  cpf?: string
  phone?: number
  image_link?: string;
}

