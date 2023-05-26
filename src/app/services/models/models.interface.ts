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

export interface FuncionariosResponse {
  output: {};
  recordset: Funcionarios[];
  recordsets: [Funcionarios[]];
  rowsAffected: [number];
}

export interface Funcionarios {
  num_funcionario: string;
  nome_funcionario: string;
  idade: number;
  telefone: string;
  email: string;
  password: string;
  cargo: number;
}
export interface reservasResponse {
  output: {};
  recordset: Reservas[];
  recordsets: [Reservas[]];
  rowsAffected: [number];
}

export interface Reservas {
  num_reserva: number;
  nome: string;
  num_pessoas: number;
  data_reserva: string;
  situacao: boolean;
  hora_reserva: string;
  nomeCliente: string;
}

export interface reservas {
  message: string;
}


