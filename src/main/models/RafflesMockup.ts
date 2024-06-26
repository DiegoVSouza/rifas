import { Raffle } from "../../Domain/Model/Raffle";

export const mockRaffles: Raffle[] = [
    {
      id: "1",
      name: "Carro Novo",
      image_link: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
      city: "São Paulo",
      price: 50.00,
      total: 100,
      sold: 50,
      numbers: [],
      date_time: new Date('07/01/2024')
    },
    {
      id: "2",
      name: "Moto Zero",
      image_link: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
      city: "Rio de Janeiro",
      price: 25.00,
      total: 150,
      sold: 100,
      numbers: [],
      date_time: new Date('07/01/2024')
    },
    {
      id: "3",
      name: "Viagem para Disney",
      image_link: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
      city: "Curitiba",
      price: 100.00,
      total: 200,
      sold: 75,
      numbers: [],
      date_time: new Date('07/01/2024')
    },
    {
      id: "4",
      name: "iPhone Novo",
      image_link: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
      city: "Belo Horizonte",
      price: 10.00,
      total: 100,
      sold: 20,
      numbers: [],
      date_time: new Date('07/01/2024')
    },
    {
      id: "5",
      name: "Notebook Gamer",
      image_link: "https://casa-das-bicicletas-container.s3.sa-east-1.amazonaws.com/Image.png",
      city: "Porto Alegre",
      price: 70.00,
      total: 100,
      sold: 75,
      numbers: [],
      date_time: new Date('07/01/2024')
    }
  ];
  