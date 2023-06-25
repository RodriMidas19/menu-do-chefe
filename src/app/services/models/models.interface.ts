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

export interface Encomenda {
  num_encomenda: number;
  preco_total: number;
  nomeC: string;
  nome: string;
  morada: string;
  morada_alternativa: string;
  situacao: number;
}

export interface reservas {
  message: string;
}

export interface mesasResponse {
  output: {};
  recordset: Mesas[];
  recordsets: [Mesas[]];
  rowsAffected: [number];
}
export interface Mesas {
  num_mesa: string;
  num_restaurante: number;
  num_lugares: number;
}
export interface cargosResponse {
  output: {};
  recordset: Cargos[];
  recordsets: [Cargos[]];
  rowsAffected: [number];
}
export interface Cargos {
  id_cargo: number;
  nome_cargo: string;
}

export interface produtosResponse {
  output: {};
  recordset: Produto[];
  recordsets: [Produto[]];
  rowsAffected: [number];
}
export interface Produto {
  id_produto: number;
  nome_produto: string;
  preco: number;
  disponivel: boolean;
  prod_imagem: string;
}
export interface Admin {
  nome_funcionario: string;
}

export interface UserR {
  nome: string;
  data_reserva: string;
  hora_reserva: string;
  situacao: number;
}

export interface UserE {
  nome: string;
  preco_total: number;
  situacao: number;
}

export interface UserP {
  nome_produto: string;
  quantidade_produto: number;
}
export interface RestauranteD{
  name:string;
  code:number;
}
export interface ReservasD{
  name:string;
  code:string;
}
