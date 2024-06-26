import { Raffle } from "../../Domain/Model/Raffle";

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
      numbers: [],
      date: new Date('07/01/2024'),
      regulation: '123',
      description: '123'
    }
  ];
  