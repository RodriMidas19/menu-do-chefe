export interface loginResponse {
  code: number;
  id: string;
  message: string;
}

export interface RestaurantResponse {
  output: {};
  recordset: Restaurant[];
  recordsets: [Restaurant[]];
  rowsAffected: [number];
}

export interface Restaurant {
  num_restaurante: number;
  nome: string;
  morada: string;
  localidade: string;
}

export interface ClientesResponse {
  output: {};
  recordset: Clients[];
  recordsets: [Clients[]];
  rowsAffected: [number];
}

export interface Clients {
  id_cliente: number;
  nome: string;
  data_nasc: string;
  telefone: string;
  morada: string;
  email: string;
  password: string;
}
