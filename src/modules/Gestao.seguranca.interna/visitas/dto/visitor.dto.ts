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
  fk_tipo_identificacao?: any;
  num_identificacao: string;
  Data_validade_doc: string;
  isIncompleteted?: boolean;
  contactos: Contato[];
  pertences: Pertence[];
  visitaId: number;
  code?: string;
}