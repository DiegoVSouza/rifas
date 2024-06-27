import { Numbers, Raffle } from "../../Domain/Model/Raffle";
import { User } from "../../Domain/Model/User";

const mockNumbers: Numbers[] = [
  { id: '1', number: 23, free: false, raffleId: "5" },
  { id: '2', number: 87, free: false, raffleId: "5", userId: 'u1' },
  { id: '3', number: 45, free: false, raffleId: "5" },
  { id: '4', number: 64, free: false, raffleId: "5", userId: 'u2' },
  { id: '5', number: 32, free: false, raffleId: "5" },
  { id: '6', number: 58, free: false, raffleId: "5", userId: 'u3' },
  { id: '7', number: 91, free: false, raffleId: "5" },
  { id: '8', number: 77, free: false, raffleId: "5", userId: 'u4' },
  { id: '9', number: 14, free: false, raffleId: "5" },
  { id: '10', number: 39, free: false, raffleId: "5", userId: 'u5' },
  { id: '11', number: 66, free: false, raffleId: "5" },
  { id: '12', number: 80, free: false, raffleId: "5", userId: 'u6' },
  { id: '13', number: 29, free: false, raffleId: "5" },
  { id: '14', number: 51, free: false, raffleId: "5", userId: 'u7' },
  { id: '15', number: 73, free: false, raffleId: "5" },
];

const user1: User = {
  id: '1',
  name: 'Alice Smith',
  cpf: '123.456.789-00',
  phone: '1234567890',
  city: 'New York',
  email: 'alice.smith@example.com',
  password: 'password123',
  imageUrl: 'https://example.com/images/alice.jpg'
};

const user2: User = {
  id: '2',
  name: 'Bob Johnson',
  cpf: '987.654.321-00',
  phone: '9876543210',
  city: "Belo Horizonte",
  email: 'bob.johnson@example.com',
  password: 'password456',
  imageUrl: 'https://example.com/images/bob.jpg'
};

const users = [user1, user2]
export const mockRaffles: Raffle[] = [
  {
    id: "1",
    title: "Carro Novo",
    imageUrl: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "São Paulo",
    price: 50.00,
    total: 100,
    free: 50,
    numbers: [],
    date: new Date('07/01/2024'),
    regulation: '123',
    description: '123'
  },
  {
    id: "2",
    title: "Moto Zero",
    imageUrl: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "Rio de Janeiro",
    price: 25.00,
    total: 150,
    free: 100,
    numbers: [],
    date: new Date('07/01/2024'),
    regulation: '123',
    description: '123'
  },
  {
    id: "3",
    title: "Viagem para Disney",
    imageUrl: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "Curitiba",
    price: 100.00,
    total: 200,
    free: 75,
    numbers: [],
    date: new Date('07/01/2024'),
    regulation: '123',
    description: '123'
  },
  {
    id: "4",
    title: "iPhone Novo",
    imageUrl: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "Belo Horizonte",
    price: 10.00,
    total: 100,
    free: 20,
    numbers: [],
    date: new Date('07/01/2024'),
    regulation: '123',
    description: '123'
  },
  {
    id: "5",
    title: "Notebook Gamer",
    imageUrl: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
    city: "Porto Alegre",
    price: 70.00,
    total: 100,
    free: 75,
    numbers: mockNumbers,
    date: new Date(),
    regulation: '123',
    description: '123',
    winners: users
  }
];
