export interface Contato {
  contacto: string;
}

export interface Pertence {
  fk_pertence: number;
}

export interface Visitante {
  nome: string;
  sobrenome: string;
  hora_entrada:string;
  fk_tipo_identificacao: number;
  num_identificacao: string;
  Data_validade_doc: string;
  contactos: Contato[];
  pertences: Pertence[];
  visitaId: number;
}