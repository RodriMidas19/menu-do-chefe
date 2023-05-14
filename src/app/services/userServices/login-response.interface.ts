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
