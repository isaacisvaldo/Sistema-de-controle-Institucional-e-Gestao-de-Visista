export interface VisitanteIncompleto {
    documentNumber: string;
    tipo_documento: number;
    fk_tipo_visita: number
    documentValid?: string;
    firstName?: string;
    lastName?: string;
    idUser: number;
    isIncompleteted: boolean;
    
  }

  export interface AnexoVisitante {
    fk_visitante: number;
    file1: string;
    file2: string;
    
  }