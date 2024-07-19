import { Numbers, Raffle } from "../../Domain/Model/Raffle";
import { User } from "../../Domain/Model/User";

const mockquotas: Numbers[] = [
  { id: '1', number: 23, free: false, raffle_id: "5" },
  { id: '2', number: 87, free: false, raffle_id: "5", user_id: 'u1' },
  { id: '3', number: 45, free: false, raffle_id: "5" },
  { id: '4', number: 64, free: false, raffle_id: "5", user_id: 'u2' },
  { id: '5', number: 32, free: false, raffle_id: "5" },
  { id: '6', number: 58, free: false, raffle_id: "5", user_id: 'u3' },
  { id: '7', number: 91, free: false, raffle_id: "5" },
  { id: '8', number: 77, free: false, raffle_id: "5", user_id: 'u4' },
  { id: '9', number: 14, free: false, raffle_id: "5" },
  { id: '10', number: 39, free: false, raffle_id: "5", user_id: 'u5' },
  { id: '11', number: 66, free: false, raffle_id: "5" },
  { id: '12', number: 80, free: false, raffle_id: "5", user_id: 'u6' },
  { id: '13', number: 29, free: false, raffle_id: "5" },
  { id: '14', number: 51, free: false, raffle_id: "5", user_id: 'u7' },
  { id: '15', number: 73, free: false, raffle_id: "5" },
];

const user1: User = {
  id: '1',
  name: 'Alice Smith',
  cpf: '123.456.789-00',
  phone: '1234567890',
  city: 'New York',
  email: 'alice.smith@example.com',
  password: 'password123',
  image_url: 'https://example.com/images/alice.jpg'
};

const user2: User = {
  id: '2',
  name: 'Bob Johnson',
  cpf: '987.654.321-00',
  phone: '9876543210',
  city: "Belo Horizonte",
  email: 'bob.johnson@example.com',
  password: 'password456',
  image_url: 'https://example.com/images/bob.jpg'
};

export const mockUsers = [user1, user2]
export const mockRaffles: Raffle[] = [
  {
    id: "1",
    title: "Carro Novo",
    image_url: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "São Paulo",
    price: 50.00,
    total: 100,
    free: 50,
    quotas: [],
    date: new Date('07/05/2024'),
    regulation: '123',
    description: '123'
  },
  {
    id: "2",
    title: "Moto Zero",
    image_url: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "Rio de Janeiro",
    price: 25.00,
    total: 150,
    free: 100,
    quotas: [],
    date: new Date('07/05/2024'),
    regulation: '123',
    description: '123'
  },
  {
    id: "3",
    title: "Viagem para Disney",
    image_url: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "Curitiba",
    price: 100.00,
    total: 200,
    free: 75,
    quotas: [],
    date: new Date('07/05/2024'),
    regulation: '123',
    description: '123'
  },
  {
    id: "4",
    title: "iPhone Novo",
    image_url: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "Belo Horizonte",
    price: 10.00,
    total: 100,
    free: 20,
    quotas: [],
    date: new Date('07/05/2024'),
    regulation: '123',
    description: '123'
  },
  {
    id: "5",
    title: "Notebook Gamer",
    image_url: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "Porto Alegre-RS",
    price: 70.00,
    total: 100,
    free: 75,
    quotas: mockquotas,
    date: new Date('07/05/2024'),
    regulation: '123',
    description: '123',
    winners: mockUsers
  }
];
